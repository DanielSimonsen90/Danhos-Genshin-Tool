import StoreBuilder from "@/stores/StoreBuilder";

import artifactsSlice from "./models/artifacts.slice";
import charactersSlice from "./models/characters.slice";
import domainsSlice from "./models/domains.slice";
import materialsSlice from "./models/materials.slice";
import mobsSlice from "./models/mobs.slice";
import weaponsSlice from "./models/weapons.slice";

import artifactCharacterSlice from "./relationships/artifact-character.slice";
import artifactDomainSlice from "./relationships/artifact-domain.slice";
import artifactMaterialSlice from "./relationships/artifact-material.slice";
import artifactRegionSlice from "./relationships/artifact-region.slice";
import characterMaterialSlice from "./relationships/character-material.slice";
import characterWeaponSlice from "./relationships/character-weapon.slice";
import domainMaterialSlice from "./relationships/domain-material.slice";
import materialMobSlice from "./relationships/material-mob.slice";
import materialModelSlice from "./relationships/material-model.slice";
import materialWeaponSlice from "./relationships/material-weapon.slice";

export default new StoreBuilder()
  .addSlice(artifactsSlice)
  .addSlice(charactersSlice)
  .addSlice(domainsSlice)
  .addSlice(materialsSlice)
  .addSlice(mobsSlice)
  .addSlice(weaponsSlice)

  .addSlice(artifactCharacterSlice)
  .addSlice(artifactDomainSlice)
  .addSlice(artifactMaterialSlice)
  .addSlice(artifactRegionSlice)

  .addSlice(characterMaterialSlice)
  .addSlice(characterWeaponSlice)

  .addSlice(domainMaterialSlice)

  .addSlice(materialMobSlice)
  .addSlice(materialModelSlice)
  .addSlice(materialWeaponSlice);