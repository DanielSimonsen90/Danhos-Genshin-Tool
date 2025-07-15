import './DataIndex.scss';
import DataIndex from './DataIndex';

export { default as Artifacts } from './Artifacts';
export { default as Artifact } from './Artifacts/{artifactName}';
export { default as Characters } from './Characters';
export { default as Character } from './Characters/{characterName}';
export { default as Domains } from './Domains';
export { default as Domain } from './Domains/{domainName}';
export { default as Materials } from './Materials';
export { default as Material } from './Materials/{materialName}';
export { default as Mobs } from './Mobs';
export { default as Mob } from './Mobs/{mobName}';
export { default as Weapons } from './Weapons';
export { default as Weapon } from './Weapons/{weaponName}';

function DataPage() {
  return (
    <div className="page data-page">
      <DataIndex />
    </div>
  );
}

export { DataPage as DataIndex }