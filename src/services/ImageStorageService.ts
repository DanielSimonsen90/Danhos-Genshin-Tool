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
      const data = await this.download(source, target.mimeType);
      if (!data) continue;

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

    return { filePath, mimeType: MIME_TYPES[extension as ImageExtension] };
  }

  private async readStored(filePath: string, mimeType: string): Promise<FetchImageResult> {
    try {
      return { data: await fs.readFile(filePath), mimeType };
    } catch {
      return null;
    }
  }

  private async download(source: string, expectedMimeType: string): Promise<Buffer | null> {
    const url = new URL(source);
    if (url.protocol !== 'https:' || !TRUSTED_IMAGE_HOSTS.includes(url.host)) {
      console.warn(`[ImageStorageService] Skipped untrusted source ${source}`);
      return null;
    }

    try {
      const response = await net.fetch(source, {
        headers: {
          'User-Agent': BROWSER_USER_AGENT,
          'Accept': 'image/png,image/webp,image/*;q=0.8',
          'Referer': `${url.origin}/`,
        },
      });
      if (!response.ok) {
        console.warn(`[ImageStorageService] ${source} responded ${response.status}`);
        return null;
      }

      const data = Buffer.from(await response.arrayBuffer());
      const actualMimeType = this.sniffMimeType(data);
      if (actualMimeType !== expectedMimeType) {
        console.warn(`[ImageStorageService] ${source} returned ${actualMimeType ?? 'a non-image'}, expected ${expectedMimeType}`);
        return null;
      }

      return data;
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
