import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getElement } from '@/data/elements';

import { Element } from '@/common/types';
import { ROUTES } from '@/common/constants/routes';
import {
  ArtifactSet, Character, Model,
  List, Domain, DomainOfBlessing,
  Mob,
  Weapon,
} from '@/common/models';
import { pascalCaseFromSnakeCase } from '@/common/functions/strings';

import { DataStore, useDataStore } from '@/stores';
import { useDebounceValue } from '@/hooks/useDebounceValue';

// Import existing model cards
import { CharacterCard } from '@/components/domain/models/Character';
import { ArtifactCard } from '@/components/domain/models/Artifacts';
import { DomainCard } from '@/components/domain/models/Domain';
import { MaterialCard } from '@/components/domain/models/Material';
import { MobCard } from '@/components/domain/models/Mob';
import { WeaponCard } from '@/components/domain/models/Weapon';

const DATA_PREFIX = ROUTES.data;
const routes = [
  [ROUTES.endRoute('data_characters'), 'Characters'],
  [ROUTES.endRoute('data_artifacts'), 'Artifacts'],
  [ROUTES.endRoute('data_domains'), 'Domains'],
  [ROUTES.endRoute('data_weapons'), 'Weapons'],
  [ROUTES.endRoute('data_materials'), 'Materials'],
  [ROUTES.endRoute('data_mobs'), 'Mobs'],
];

type Order = `${'name' | 'rarity' | 'element'}-${'ascend' | 'descend'}`;

const getModelElement = (model: ArtifactSet): Element | undefined => [
  model.twoPieceSetDescription,
  model.fourPieceSetDescription,
].map(getElement).find(Boolean);
const getDomainElement = (domain: DomainOfBlessing, dataStore: DataStore, order: Order): Element | undefined => domain.getRewards(dataStore)
  .map(getModelElement)
  .filter(Boolean)
  .sort((a, b) => order === 'element-ascend' ? a.localeCompare(b) : b.localeCompare(a))
[0];

export default function DataIndex() {
  const DataStore = useDataStore();
  const {
    CharacterNames, ArtifactNames, DomainNames, WeaponNames, MaterialNames, MobNames,
    Characters, Artifacts, Domains, Weapons, Materials, Mobs,
  } = DataStore;

  const groups = [
    ['characters', CharacterNames],
    ['artifacts', ArtifactNames],
    ['domains', DomainNames],
    ['weapons', WeaponNames],
    ['materials', MaterialNames],
    ['mobs', MobNames],

  ] as const;
  const groupModels = new Map<string, List<Model>>([
    ['characters', Characters],
    ['artifacts', Artifacts],
    ['domains', Domains],
    ['weapons', Weapons],
    ['materials', Materials],
    ['mobs', Mobs],
  ]);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounceValue(search, 300);
  const isSearching = debouncedSearch.length > 0;
  // Helper function to render model cards
  const renderModelCard = (model: Model, group: string, name: string, nameTag?: 'h3') => {
    const cardProps = { key: name, wrapInLink: true, ...(nameTag && { nameTag }) };
    
    switch (group) {
      case 'characters': return <CharacterCard {...cardProps} character={model as Character} />;
      case 'artifacts': return <ArtifactCard {...cardProps} artifact={model as ArtifactSet} />;
      case 'domains': return <DomainCard {...cardProps} domain={model as Domain<any>} />;
      case 'materials': return <MaterialCard {...cardProps} material={model as any} />;
      case 'mobs': return <MobCard {...cardProps} mob={model as Mob} />;
      case 'weapons': return <WeaponCard {...cardProps} weapon={model as Weapon} />;
      default: return null;
    }
  };

  // Unified data structure for both default and search views
  const displayGroups = useMemo(() => {
    return groups.map(([group, names]) => {
      const filteredNames = isSearching 
        ? names.filter(name => name.toLowerCase().includes(debouncedSearch.toLowerCase()))
        : names.slice(0, 9); // Show first 9 for default view
      
      return {
        group,
        displayName: pascalCaseFromSnakeCase(group),
        totalCount: names.length,
        filteredCount: filteredNames.length,
        names: filteredNames,
        isVisible: isSearching ? filteredNames.length > 0 : true
      };
    });
  }, [groups, debouncedSearch, isSearching]);

  return (
    <div className="data-hub">
      <header className="data-hub__header">
        <input
          type='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search for a character, artifact, domain, weapon, material or mob...'
        />

        <nav>
          {routes.map(([route, name]) => (
            <Link key={route} to={`/${DATA_PREFIX}/${route}`} className="quick-nav-item">
              {name}
            </Link>
          ))}
        </nav>
      </header>      <main className="data-hub__content">
        {isSearching && displayGroups.every(group => group.filteredCount === 0) ? (
          <p className="no-results">No results found for "{debouncedSearch}"</p>
        ) : (
          <section className="categories-overview">
            {displayGroups.map(({ group, displayName, totalCount, filteredCount, names, isVisible }) => (
              isVisible && (
                <div key={group} className="category-section">
                  <header className="category-section__header">
                    <Link to={`/${DATA_PREFIX}/${group}`}>
                      <h2>{displayName}</h2>
                    </Link>
                    <span className="model-count">
                      {isSearching ? `${filteredCount} of ${totalCount}` : `${totalCount}`} {group}
                    </span>
                  </header>

                  <ul className="models-grid">
                    {names.map(name => {
                      const model = groupModels.get(group)?.find(m => m.name === name);
                      if (!model) return null;

                      const card = renderModelCard(model, group, name, isSearching ? undefined : 'h3');
                      return (
                        <li key={name}>
                          {card}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
