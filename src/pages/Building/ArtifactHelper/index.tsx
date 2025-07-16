import './ArtifactHelper.scss';
import ArtifactHelper from './ArtifactHelper';

export { default as Search } from './Search';

function ArtifactHelperPage() {
  return (
    <div className="page artifact-helper-page">
      <ArtifactHelper />
    </div>
  );
}

export { ArtifactHelperPage as ArtifactHelper };