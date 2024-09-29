import type * as ArtifactsData from '@/data/artifact-sets';
import { ArtifactPartName } from './genshin';
import { MainStatName, SubStatName } from './stat-types';

export type SearchFormData = {
  artifactSetName: keyof typeof ArtifactsData;
  artifactPartName: ArtifactPartName;
  mainStat: MainStatName;
  subStats: SubStatName[];
} & {
  id: string;
}