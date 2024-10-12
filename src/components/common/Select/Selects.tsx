import { addSpacesToCamelCase, snakeCaseFromCamelCase } from "@/common/functions/strings";
import type { ArtifactPartName, MainStatMap, MainStatName, SubStatName } from "@/common/types";

import { useArtifactData, useCharacterData } from "@/stores/DataStore";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

import type { PublicProps, PublicMultipleProps } from "./types";
import Select from "./Select";
import SelectMultiple from "./SelectMultiple";

export const SelectArtifactSet = (
  props: PublicProps<DataStore['ArtifactNames'][0]>
) => {
  const { ArtifactNames: ArtifactSetNames } = useArtifactData();

  return <Select
    options={ArtifactSetNames}
    placeholder='Select an artifact set'
    internalValue={snakeCaseFromCamelCase}
    displayValue={addSpacesToCamelCase}
    {...props}
  />;
}

export const SelectCharacter = (
  props: PublicProps<DataStore['CharacterNames'][0]>
) => {
  const { CharacterNames } = useCharacterData();

  return <Select
    options={CharacterNames}
    placeholder='Select a character'
    internalValue={snakeCaseFromCamelCase}
    displayValue={addSpacesToCamelCase}
    {...props}
  />;
}

export const SelectArtifactPartName = (
  props: PublicProps<ArtifactPartName>
) => <Select 
  options={['Flower', 'Feather', 'Sands', 'Goblet', 'Circlet']} 
  placeholder='Select an artifact part'
  {...props}
/>;

export const SelectMainStat = ({ 
  artifactPartName, 
  ...props
}: PublicProps<MainStatName> & { artifactPartName: ArtifactPartName }
) => {
  const options = (
    artifactPartName === 'Flower' ? ['HP%'] as MainStatMap['Flower'][]
    : artifactPartName === 'Feather' ? ['ATK%'] as MainStatMap['Feather'][]
    : artifactPartName === 'Sands' ?  [
      'HP%', 'ATK%', 'DEF%', 
      'Elemental Mastery', 'Energy Recharge'
    ] as MainStatMap['Sands'][]
    : artifactPartName === 'Goblet' ? [
      'HP%', 'ATK%', 'DEF%', 
      'Elemental Mastery', 'Physical DMG Bonus',
      'Anemo DMG Bonus', 'Cryo DMG Bonus', 'Dendro DMG Bonus', 
      'Electro DMG Bonus', 'Geo DMG Bonus', 
      'Hydro DMG Bonus', 'Pyro DMG Bonus', 
    ] as MainStatMap['Goblet'][]
    : artifactPartName === 'Circlet' ? [
      'HP%', 'ATK%', 'DEF%', 
      'Elemental Mastery', 'Crit Rate', 'Crit DMG', 'Healing Bonus'
    ] as MainStatMap['Circlet'][]
    : []
  );

  return <Select
    options={options}
    placeholder='Select a main stat'
    {...props}
  />;
};

export const SelectSubStat = (
  props: PublicMultipleProps<SubStatName>
) => <SelectMultiple max={4}
  options={[
    'HP', 'ATK', 'DEF', 
    'HP%', 'ATK%', 'DEF%',
    'Elemental Mastery', 'Energy Recharge', 
    'Crit Rate', 'Crit DMG',
  ] /*satisfies SubStatName[]*/} // Bundler errors on "satisfies" keyword
  placeholder='Select a sub stat' 
  {...props}
/>;