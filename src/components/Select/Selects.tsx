import { DataStore } from "@/stores";

import Select from "./Select";
import { PublicProps, PublicMultipleProps } from "./types";
import { ArtifactPartName, MainStatMap, MainStatName, SubStatName } from "@/common/types";
import SelectMultiple from "./SelectMultiple";
import { addSpacesToCamelCase, snakeCaseFromCamelCase } from "@/common/functions/strings";

export const SelectArtifactSet = (
  props: PublicProps<typeof DataStore.ArtifactSetNames[0]>
) => <Select 
  options={DataStore.ArtifactSetNames} 
  placeholder='Select an artifact set'
  internalValue={snakeCaseFromCamelCase}
  displayValue={addSpacesToCamelCase}
  {...props}
/>;

export const SelectCharacter = (
  props: PublicProps<typeof DataStore.CharacterNames[0]>
) => <Select 
  options={DataStore.CharacterNames} 
  placeholder='Select a character' 
  internalValue={snakeCaseFromCamelCase}
  displayValue={addSpacesToCamelCase}
  {...props}
/>;

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
      'Anemo DMG Bonus', 'Dendro DMG Bonus', 'Geo DMG Bonus', 
      'Electro DMG Bonus', 'Hydro DMG Bonus', 'Pyro DMG Bonus', 
      'Cryo DMG Bonus',
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
) => <SelectMultiple
  options={[
    'HP', 'ATK', 'DEF', 
    'HP%', 'ATK%', 'DEF%',
    'Elemental Mastery', 'Energy Recharge', 
    'Crit Rate', 'Crit DMG',
  ] /*satisfies SubStatName[]*/} // Bundler errors on "satisfies" keyword
  placeholder='Select a sub stat' 
  {...props}
/>;