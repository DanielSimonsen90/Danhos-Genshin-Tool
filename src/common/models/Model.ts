import Character from "./characters/Character";
import ArtifactSet from "./artifacts/ArtifactSet";
import { Domain } from './domains/Domain';

export type Model = Character | ArtifactSet | Domain<any>;
export type ModelKeys = 'Character' | 'Artifact' | 'Domain';