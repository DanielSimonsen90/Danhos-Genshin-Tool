import StoreBuilder from "@/stores/StoreBuilder";
import * as ArtifactsData from '@/data/artifact-sets';
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";

export default new StoreBuilder()
  .addState({
    ArtifactsData,
    Artifacts: List.from(ArtifactsData),
    ArtifactNames: List.from(ArtifactsData).map(artifact => artifact.name),
  })
  .addApi(({ get }) => {
    return {
      findArtifactByName(name: string, suppressWarning = false) {
        return findByName(get().Artifacts, name, suppressWarning);
      }
    };
  });