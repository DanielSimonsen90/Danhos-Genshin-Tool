import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import * as CharacterData from '../src/data/characters';
import { Character } from '../src/common/models';
import { getTalentImageRequest } from '../src/common/functions/talent-images';
import { TRUSTED_IMAGE_HOSTS } from '../src/common/constants/image-providers';
import type { TalentType } from '../src/common/types';

const IMAGES_DIRECTORY = path.resolve(__dirname, '..', 'src', 'assets', 'images');
const TALENT_TYPES: Array<TalentType> = ['Normal/Press', 'Skill/Ability', 'Burst/Ult'];
const BROWSER_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

const args = new Set(process.argv.slice(2));
const showSources = args.has('--sources');
const dryRun = args.has('--dry-run');

type MissingImage = {
  character: string;
  talentType: TalentType;
  relativePath: string;
  sources: Array<string>;
};

const exists = (filePath: string) => fs.access(filePath).then(() => true, () => false);

const findMissingImages = async (characters: Array<Character>) => {
  const checked = new Map<string, boolean>();
  const missing: Array<MissingImage> = [];

  for (const character of characters) {
    for (const talentType of TALENT_TYPES) {
      const { relativePath, sources } = getTalentImageRequest(character, talentType);

      if (!checked.has(relativePath)) {
        checked.set(relativePath, await exists(path.join(IMAGES_DIRECTORY, relativePath)));
      }
      if (!checked.get(relativePath)) {
        missing.push({ character: character.name, talentType, relativePath, sources });
      }
    }
  }

  return { missing, checkedFiles: checked.size };
};

const sniffMimeType = (data: Buffer) => {
  if (data.subarray(0, 4).equals(PNG_SIGNATURE)) return 'png';
  else if (data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  return null;
};

const downloadFromSource = async (source: string) => {
  const url = new URL(source);
  if (url.protocol !== 'https:' || !TRUSTED_IMAGE_HOSTS.includes(url.host)) {
    console.warn(`    Skipped untrusted source ${source}`);
    return null;
  }

  try {
    const response = await fetch(source, {
      headers: { 'User-Agent': BROWSER_USER_AGENT, 'Accept': 'image/png,image/webp', 'Referer': `${url.origin}/` },
    });
    if (!response.ok) {
      console.warn(`    ${source} responded ${response.status}`);
      return null;
    }

    const data = Buffer.from(await response.arrayBuffer());
    const format = sniffMimeType(data);
    if (!format) {
      console.warn(`    ${source} returned a non-image`);
      return null;
    }

    return format === 'webp' ? data : sharp(data).webp({ quality: 90, alphaQuality: 100 }).toBuffer();
  } catch (error) {
    console.warn(`    ${source} failed: ${error instanceof Error ? error.message : error}`);
    return null;
  }
};

const downloadImage = async ({ relativePath, sources }: Pick<MissingImage, 'relativePath' | 'sources'>) => {
  for (const source of sources) {
    const data = await downloadFromSource(source);
    if (!data) continue;

    const filePath = path.join(IMAGES_DIRECTORY, relativePath);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, data);
    console.log(`  + ${relativePath} <- ${source}`);
    return true;
  }

  return false;
};

const downloadMissingImages = async (missing: Array<MissingImage>) => {
  const requests = new Map(missing.map(entry => [entry.relativePath, entry]));
  const failed: Array<string> = [];

  console.log(`Downloading ${requests.size} missing images`);
  for (const request of requests.values()) {
    if (!await downloadImage(request)) {
      console.warn(`  - Failed ${request.relativePath} (${request.character})`);
      failed.push(request.relativePath);
    }
  }

  console.log(`Stored ${requests.size - failed.length}, failed ${failed.length}`);
  return failed;
};

const main = async () => {
  const characters = Object.values(CharacterData).filter(Character.isCharacter);
  const { missing, checkedFiles } = await findMissingImages(characters);

  console.log(`Checked ${checkedFiles} talent images for ${characters.length} characters`);
  if (!missing.length) {
    console.log('All talent images are stored locally');
    return;
  }

  const attackImages = missing.filter(entry => entry.talentType === 'Normal/Press');
  const talentImages = missing.filter(entry => entry.talentType !== 'Normal/Press');
  const attackPaths = [...new Set(attackImages.map(entry => entry.relativePath))];

  console.log(`Missing ${attackPaths.length} shared attack images and ${talentImages.length} skill/burst images`);

  for (const relativePath of attackPaths) {
    const entries = attackImages.filter(entry => entry.relativePath === relativePath);
    console.log(`  - ${relativePath} (${entries.map(entry => entry.character).join(', ')})`);
    if (showSources) entries[0].sources.forEach(source => console.log(`      ${source}`));
  }

  const byCharacter = new Map<string, Array<MissingImage>>();
  talentImages.forEach(entry => byCharacter.set(entry.character, [...byCharacter.get(entry.character) ?? [], entry]));

  for (const [character, entries] of byCharacter) {
    console.log(`  - ${character}: ${entries.map(entry => path.basename(entry.relativePath)).join(', ')}`);
    if (showSources) entries.forEach(entry => entry.sources.forEach(source => console.log(`      ${source}`)));
  }

  if (dryRun) {
    process.exitCode = 1;
    return;
  }

  const failed = await downloadMissingImages(missing);
  if (failed.length) process.exitCode = 1;
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
