import './DataIndex.scss';
import DataIndex from './DataIndex';

export { default as Characters } from './Characters';
export { default as Character } from './Characters/{characterName}';
export { default as Artifacts } from './Artifacts';
export { default as Artifact } from './Artifacts/{artifactName}';
export { default as Domains } from './Domains';
export { default as Domain } from './Domains/{domainName}';

function DataPage() {
  return (
    <div className="page data-page">
      <DataIndex />
    </div>
  );
}

export { DataPage as DataIndex }