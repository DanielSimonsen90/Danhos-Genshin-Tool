import { Link, useParams } from 'react-router-dom';
import { ArtifactCard } from '@/components/domain/Artifacts';
import { useDataStore } from '@/stores';
import { useMemo } from 'react';
import { ItemHeader } from '@/components/domain/Item';

export default function ArtifactPage() {
  const { artifactName } = useParams();
  const DataStore = useDataStore();
  const artifact = useMemo(() => DataStore.findArtifactByName(artifactName), [DataStore, artifactName]);

  if (!artifact) {
    return (
      <main>
        <h1>Unable to find {artifactName}.</h1>
        <Link to="/artifacts">Back to Artifacts</Link>
      </main>
    );
  }

  return (
    <>
      <ItemHeader itemName="artifact" item={artifact} />
      <main>
        <ArtifactCard artifact={artifact} showDetails showMoreDetails displayCraftable />
      </main>
    </>
  );
}