import { app, net } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
import { TRUSTED_IMAGE_HOSTS } from '@/common/constants/image-providers';
import type { FetchImageRequest, FetchImageResult, ImageExtension } from '@/common/types/images';

const BROWSER_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const MIME_TYPES: Record<ImageExtension, string> = {
  png: 'image/png',
  webp: 'image/webp',
};
const ACCEPTED_MIME_TYPES = Object.values(MIME_TYPES);

export const ImageStorageService = new class ImageStorageService {
  private readonly imagesRoot = path.join(app.getAppPath(), 'src', 'assets', 'images');

  public async fetchImage({ relativePath, sources }: FetchImageRequest): Promise<FetchImageResult> {
    const target = this.resolveTarget(relativePath);
    if (!target) {
      console.warn(`[ImageStorageService] Rejected path "${relativePath}"`);
      return null;
    }

    const stored = await this.readStored(target.filePath, target.mimeType);
    if (stored) return stored;

    for (const source of sources) {
      const downloaded = await this.download(source);
      if (!downloaded) continue;

      const data = downloaded.mimeType === target.mimeType
        ? downloaded.data
        : await this.convert(downloaded.data, target.extension);

      await fs.mkdir(path.dirname(target.filePath), { recursive: true });
      await fs.writeFile(target.filePath, data);
      console.info(`[ImageStorageService] Stored ${relativePath} from ${source}`);
      return { data, mimeType: target.mimeType };
    }

    console.warn(`[ImageStorageService] No trusted provider could supply ${relativePath}`);
    return null;
  }

  private resolveTarget(relativePath: string) {
    const filePath = path.resolve(this.imagesRoot, relativePath);
    const extension = path.extname(filePath).slice(1).toLowerCase();

    if (!filePath.startsWith(this.imagesRoot + path.sep)) return null;
    else if (!(extension in MIME_TYPES)) return null;

    return { filePath, extension: extension as ImageExtension, mimeType: MIME_TYPES[extension as ImageExtension] };
  }

  /**
   * Converts every `.png` below the images root to `.webp`, so the repository only stores the preferred format.
   * Each source `.png` is removed once its `.webp` exists. Development only.
   *
   * @returns The number of images converted
   */
  public async convertPngsToWebp(): Promise<number> {
    const files = await this.listFiles(this.imagesRoot);
    const pngs = files.filter(file => path.extname(file).toLowerCase() === '.png');
    let converted = 0;

    for (const png of pngs) {
      const webp = png.replace(/\.png$/i, '.webp');
      try {
        if (!await this.exists(webp)) {
          await fs.writeFile(webp, await this.convert(await fs.readFile(png), 'webp'));
          converted++;
        }
        await fs.unlink(png);
      } catch (error) {
        console.warn(`[ImageStorageService] Could not convert ${png}`, error);
      }
    }

    if (converted) console.info(`[ImageStorageService] Converted ${converted} png image(s) to webp`);
    return converted;
  }

  private async listFiles(directory: string): Promise<Array<string>> {
    const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
    const nested = await Promise.all(entries.map(entry => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? this.listFiles(entryPath) : [entryPath];
    }));
    return nested.flat();
  }

  private exists(filePath: string): Promise<boolean> {
    return fs.access(filePath).then(() => true, () => false);
  }

  private async convert(data: Buffer, extension: ImageExtension): Promise<Buffer> {
    const { default: sharp } = await import('sharp');
    const image = sharp(data);
    return extension === 'webp'
      ? image.webp({ quality: 90, alphaQuality: 100 }).toBuffer()
      : image.png().toBuffer();
  }

  private async readStored(filePath: string, mimeType: string): Promise<FetchImageResult> {
    try {
      return { data: await fs.readFile(filePath), mimeType };
    } catch {
      return null;
    }
  }

  private async download(source: string): Promise<{ data: Buffer; mimeType: string } | null> {
    const url = new URL(source);
    if (url.protocol !== 'https:' || !TRUSTED_IMAGE_HOSTS.includes(url.host)) {
      console.warn(`[ImageStorageService] Skipped untrusted source ${source}`);
      return null;
    }

    try {
      const response = await net.fetch(source, {
        cache: 'no-store',
        headers: {
          'User-Agent': BROWSER_USER_AGENT,
          'Accept': ACCEPTED_MIME_TYPES.join(','),
          'Referer': `${url.origin}/`,
        },
      });
      if (!response.ok) {
        console.warn(`[ImageStorageService] ${source} responded ${response.status}`);
        return null;
      }

      const data = Buffer.from(await response.arrayBuffer());
      const mimeType = this.sniffMimeType(data);
      if (!mimeType) {
        console.warn(`[ImageStorageService] ${source} returned a non-image, expected ${ACCEPTED_MIME_TYPES.join(' or ')}`);
        return null;
      }

      return { data, mimeType };
    } catch (error) {
      console.warn(`[ImageStorageService] ${source} failed`, error);
      return null;
    }
  }

  private sniffMimeType(data: Buffer): string | null {
    if (data.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return MIME_TYPES.png;
    else if (data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') return MIME_TYPES.webp;
    return null;
  }
};

export default ImageStorageService;
