import { Link, useParams } from 'react-router-dom';
import { ArtifactCard } from '@/components/domain/models/Artifacts';
import { useDataStore } from '@/stores';
import { useMemo } from 'react';
import { ItemHeader } from '@/components/domain/Item';
import { ROUTES } from '@/common/constants/routes';

export default function ArtifactPage() {
  const { artifactName } = useParams();
  const DataStore = useDataStore();
  const artifact = useMemo(() => artifactName ? DataStore.findArtifactByName(artifactName) : undefined, [DataStore, artifactName]);

  if (!artifact) {
    return (
      <main>
        <h1>Unable to find {artifactName}.</h1>
        <Link to={ROUTES.data_artifacts}>Back to Artifacts</Link>
      </main>
    );
  }

  return (
    <>
      <ItemHeader itemName="artifact" item={artifact} />
      <main>
        <ArtifactCard artifact={artifact} 
          className="selected-artifact"
          showRarity 
          showSetDescriptions 
          showCraftable 
          showRegion
          showCharacterSets 
          showDomainList

          showDomainRewards 
        />
      </main>
    </>
  );
}