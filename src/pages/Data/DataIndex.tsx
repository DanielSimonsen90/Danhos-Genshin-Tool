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

import RarityList from '@/components/common/icons/Rarity';
import { WeaponImage } from '@/components/common/Images';

import { DataStore, useDataStore } from '@/stores';
import { useDebounceValue } from '@/hooks/useDebounceValue';

// Import existing model cards
import { CharacterCard } from '@/components/domain/Character';
import { ArtifactCard } from '@/components/domain/Artifacts';
import { DomainCard } from '@/components/domain/Domain';
import { MaterialCard } from '@/components/domain/Material';
import { MobCard } from '@/components/domain/Mob';
import { WeaponCard } from '@/components/domain/Weapon';

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

  const categoryStats = useMemo(() => groups.map(([group, names]) => ({
    group,
    count: names.length,
    route: ROUTES.endRoute(`data_${group}`),
    displayName: pascalCaseFromSnakeCase(group),
    featured: names.slice(0, 9)
  })), [groups]);
  const sortedGroups = useMemo(() => {
    if (!isSearching) return [];

    return groups.map(([group, names]) => {
      const filteredNames = names.filter(name => name.toLowerCase().includes(debouncedSearch.toLowerCase()));
      return [group, filteredNames] as const;
    });
  }, [groups, groupModels, debouncedSearch, isSearching, DataStore]);

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
      </header>

      <main className="data-hub__content">
        {!isSearching ? (
          <section className="categories-overview">
            {categoryStats.map(({ group, count, route, displayName, featured }) => (
              <div key={group} className="category-section">
                <header className="category-section__header">
                  <Link to={`/${DATA_PREFIX}/${group}`}>
                    <h2>{displayName}</h2>
                  </Link>
                  <span className="model-count">{count} items</span>
                </header>

                <ul className="models-grid">
                  {featured.map(name => {
                    const model = groupModels.get(group)?.find(m => m.name === name);
                    if (!model) return null;

                    const Card = (() => {
                      switch (group) {
                        case 'characters': return <CharacterCard key={name} character={model as Character} wrapInLink nameTag='h3' />;
                        case 'artifacts': return <ArtifactCard key={name} artifact={model as ArtifactSet} wrapInLink nameTag='h3' />;
                        case 'domains': return <DomainCard key={name} domain={model as Domain<any>} wrapInLink nameTag='h3' />;
                        case 'materials': return <MaterialCard key={name} material={model as any} wrapInLink nameTag='h3' />;
                        case 'mobs': return <MobCard key={name} mob={model as Mob} wrapInLink nameTag='h3' />;
                        case 'weapons': return <WeaponCard key={name} weapon={model as Weapon} wrapInLink nameTag='h3' />;
                        default: return null;
                      }
                    })();

                    return (
                      <li key={name}>
                        {Card}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>
        ) : (
          <section className="search-results">
            {sortedGroups.length === 0 ? (
              <p className="no-results">No results found for "{debouncedSearch}"</p>
            ) : (
              sortedGroups.map(([group, names]) => (
                names.length > 0 && (
                  <details key={group} open className="search-group">
                    <summary>
                      <Link to={`/${DATA_PREFIX}/${group}`}>
                        {pascalCaseFromSnakeCase(group)} ({names.length})
                      </Link>
                    </summary>
                    <div className='search-results-grid'>
                      {names.map(name => {
                        const model = (
                          group === 'characters' ? Characters.find(c => c.name === name)
                            : group === 'artifacts' ? Artifacts.find(a => a.name === name)
                              : group === 'domains' ? Domains.find(d => d.name === name)
                                : group === 'weapons' ? Weapons.find(w => w.name === name)
                                  : group === 'materials' ? Materials.find(m => m.name === name)
                                    : group === 'mobs' ? Mobs.find(m => m.name === name)
                                      : undefined
                        );
                        if (!model) return null;

                        switch (group) {
                          case 'characters': return <CharacterCard key={name} character={model as Character} wrapInLink />;
                          case 'artifacts': return <ArtifactCard key={name} artifact={model as ArtifactSet} wrapInLink />;
                          case 'domains': return <DomainCard key={name} domain={model as Domain<any>} wrapInLink />;
                          case 'materials': return <MaterialCard key={name} material={model as any} wrapInLink />;
                          case 'mobs': return <MobCard key={name} mob={model as Mob} wrapInLink />;
                          case 'weapons': return <WeaponCard key={name} weapon={model as Weapon} wrapInLink />;
                          default: return null;
                        }
                      })}
                    </div>
                  </details>
                )
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}