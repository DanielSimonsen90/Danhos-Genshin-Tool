import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const ENEMY_LIST_URL = 'https://genshin-impact.fandom.com/wiki/Enemy/List';
const FANDOM_REFERER = 'https://genshin-impact.fandom.com/';
const IMAGE_SELECTOR = '.change-history .change-history-content img';
const MOBS_DIRECTORY = path.resolve(__dirname, '..', 'src', 'assets', 'images', 'mobs');

const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');
const DRY_RUN = args.has('--dry-run');
const HEADLESS = args.has('--headless');

type MobImage = {
  fileName: string;
  url: string;
};

const launchBrowser = async (): Promise<Browser> => {
  const launchOptions = { headless: HEADLESS, args: ['--disable-blink-features=AutomationControlled'] };

  try {
    return await chromium.launch({ ...launchOptions, channel: 'chrome' });
  } catch {
    console.warn('Google Chrome not found - falling back to bundled Chromium. Fandom may serve a Cloudflare challenge.');
    return chromium.launch(launchOptions);
  }
};

const toMobImage = (dataSrc: string): MobImage => {
  const url = dataSrc.replace(/\/revision\/latest\/scale-to-width-down\/\d+/, '');
  const originalName = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '');
  const name = originalName
    .replace(/_Icon\.png$/i, '')
    .replace(/[,:"]/g, '')
    .toLowerCase();

  return { fileName: `${name}.webp`, url };
};

const collectMobImages = async (browser: Browser) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(ENEMY_LIST_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(IMAGE_SELECTOR, { state: 'attached', timeout: 60_000 });

  const dataSrcs = await page.$$eval(IMAGE_SELECTOR, images => images
    .map(image => image.getAttribute('data-src') ?? image.getAttribute('src'))
    .filter((src): src is string => !!src && !src.startsWith('data:'))
  );

  const mobImages = new Map(dataSrcs.map(toMobImage).map(image => [image.fileName, image]));
  return { context, mobImages: [...mobImages.values()] };
};

const exists = (filePath: string) => fs.access(filePath).then(() => true, () => false);

const isWebp = (data: Buffer) => data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP';

const main = async () => {
  const browser = await launchBrowser();

  try {
    const { context, mobImages } = await collectMobImages(browser);
    console.log(`Found ${mobImages.length} mob images on the change history`);

    await fs.mkdir(MOBS_DIRECTORY, { recursive: true });
    const stored: Array<string> = [];
    const skipped: Array<string> = [];
    const failed: Array<string> = [];

    for (const { fileName, url } of mobImages) {
      const filePath = path.join(MOBS_DIRECTORY, fileName);

      if (!FORCE && await exists(filePath)) {
        skipped.push(fileName);
        continue;
      } else if (DRY_RUN) {
        stored.push(fileName);
        continue;
      }

      const response = await context.request.get(url, { headers: { Referer: FANDOM_REFERER, Accept: 'image/webp,image/*;q=0.8' } });
      const data = await response.body();
      if (!response.ok() || !isWebp(data)) {
        console.warn(`Failed ${fileName}: ${response.status()} ${response.headers()['content-type']} - ${url}`);
        failed.push(fileName);
        continue;
      }

      await fs.writeFile(filePath, data);
      stored.push(fileName);
    }

    console.log(`${DRY_RUN ? 'Would store' : 'Stored'} ${stored.length}, skipped ${skipped.length} already local, failed ${failed.length}`);
    if (stored.length) console.log(stored.map(fileName => `  + ${fileName}`).join('\n'));
    if (failed.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
