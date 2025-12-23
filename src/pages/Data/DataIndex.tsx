import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

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

import { CharacterCard } from '@/components/domain/models/Character';
import { ArtifactCard } from '@/components/domain/models/Artifacts';
import { DomainCard } from '@/components/domain/models/Domain';
import { MaterialCard } from '@/components/domain/models/Material';
import { MobCard } from '@/components/domain/models/Mob';
import { WeaponCard } from '@/components/domain/models/Weapon';
import useKeybind from '@/hooks/useKeybind';

const DATA_PREFIX = ROUTES.data;
const routes = [
  [ROUTES.endRoute('data_characters'), 'Characters'],
  [ROUTES.endRoute('data_artifacts'), 'Artifacts'],
  [ROUTES.endRoute('data_domains'), 'Domains'],
  [ROUTES.endRoute('data_weapons'), 'Weapons'],
  [ROUTES.endRoute('data_materials'), 'Materials'],
  [ROUTES.endRoute('data_mobs'), 'Mobs'],
].sort(([a], [b]) => a.localeCompare(b));

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

  // Unified data structure for both default and search views
  const displayGroups = useMemo(() => groups.map(([group, names]) => {
    const filteredNames = isSearching
      ? names.filter(name => name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      : names;
    const slicedNames = filteredNames.slice(0, 15);

    return {
      group,
      displayName: pascalCaseFromSnakeCase(group),
      totalCount: names.length,
      filteredCount: slicedNames.length,
      names: slicedNames,
      isVisible: isSearching ? slicedNames.length > 0 : true
    };
  }), [groups, debouncedSearch, isSearching]);

  const inputRef = useRef<HTMLInputElement>(null);
  useKeybind('f', { ctrlKey: true }, () => inputRef.current?.focus());

  return (
    <div className="data-hub">
      <header className="data-hub__header">
        <input
          ref={inputRef}
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

                      return (
                        <li key={name}>
                          <ModelCard model={model} group={group} name={name} nameTag={isSearching ? undefined : 'h3'} />
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

const ModelCard = ({ model, group, name, nameTag }: {
  model: Model,
  group: string,
  name: string,
  nameTag?: 'h3';
}) => {
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