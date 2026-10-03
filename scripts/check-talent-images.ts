import { promises as fs } from 'fs';
import path from 'path';
import * as CharacterData from '../src/data/characters';
import { Character } from '../src/common/models';
import { getTalentImageRequest } from '../src/common/functions/talent-images';
import type { TalentType } from '../src/common/types';

const IMAGES_DIRECTORY = path.resolve(__dirname, '..', 'src', 'assets', 'images');
const TALENT_TYPES: Array<TalentType> = ['Normal/Press', 'Skill/Ability', 'Burst/Ult'];

const showSources = process.argv.slice(2).includes('--sources');

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

  process.exitCode = 1;
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
