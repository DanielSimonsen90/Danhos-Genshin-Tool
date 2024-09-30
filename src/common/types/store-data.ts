import type * as ArtifactsData from '@/data/artifact-sets';
import { ArtifactPartName } from './genshin';
import { MainStatName, SubStatName } from './stat-types';
import { SubmitData } from '@/hooks/useActionState';

export type SearchFormData = SubmitData<{
  artifactSetName: keyof typeof ArtifactsData;
  artifactPartName: ArtifactPartName;
  mainStat: MainStatName;
  subStats: SubStatName[];
} & {
  id: string;
  title: string;
  titleNoSet: string;
  timestamp: number;
}>