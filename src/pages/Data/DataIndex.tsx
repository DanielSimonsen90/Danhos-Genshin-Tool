import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getElement } from '@/data/elements';

import { Element, Rarity } from '@/common/types';
import { ROUTES } from '@/common/constants/routes';
import { ArtifactSet, Character, Model, List, Domain, DomainOfBlessing, Mob, WeeklyBoss, WorldBoss, EliteMob, EasyMob } from '@/common/models';
import { classNames, pascalCaseFromKebabCase, pascalCaseFromSnakeCase } from '@/common/functions/strings';

import RarityList from '@/components/common/icons/Rarity';
import Select from '@/components/common/Select';
import { CharacterImage, ArtifactImage, DomainImage, ElementImage, MaterialImage } from '@/components/common/Images';

import { DataStore, useDataStore } from '@/stores';
import MobImage from '@/components/common/Images/MobImage';

const DATA_PREFIX = ROUTES.data;
const routes = [
  [ROUTES.endRoute('data_characters'), 'Characters'],
  [ROUTES.endRoute('data_artifacts'), 'Artifacts'],
  [ROUTES.endRoute('data_domains'), 'Domains'],
  //  [ROUTES.endRoute('data_weapons'), 'Weapons'],
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
const getRarityFromMob = (mob: Mob): Rarity | undefined => {
  const checks = [
    EasyMob.isEasyMob,
    EliteMob.isEliteMob,
    WorldBoss.isWorldBoss,
    WeeklyBoss.isWeeklyBoss,
  ];
  const rarity = [
    Rarity.Common,
    // Rarity.Uncommon,
    Rarity.Rare,
    Rarity.Epic,
    Rarity.Legendary,
  ];

  return rarity[checks.findIndex(check => check(mob))];
};

export default function DataIndex() {
  const DataStore = useDataStore();
  const {
    CharacterNames, ArtifactNames, DomainNames, MaterialNames, MobNames,
    Characters, Artifacts, Domains, Materials, Mobs,
  } = DataStore;

  const groups = [
    ['characters', CharacterNames],
    ['artifacts', ArtifactNames],
    ['domains', DomainNames],
    // ['weapons', WeaponNames],
    ['materials', MaterialNames],
    ['mobs', MobNames],

  ] as const;
  const groupModels = new Map<string, List<Model>>([
    ['characters', Characters],
    ['artifacts', Artifacts],
    ['domains', Domains],
    // ['weapons', Weapons],
    ['materials', Materials],
    ['mobs', Mobs],
  ]);

  const [order, setOrder] = useState<Order>('name-ascend');
  const [search, setSearch] = useState('');

  const sortedGroups = groups.map(([group, names]) => {
    const models = groupModels.get(group);
    return [group, names
      .filter(name => name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const aModel = models.find(m => m.name === a);
        const bModel = models.find(m => m.name === b);

        switch (order) {
          case 'name-ascend': return a.localeCompare(b);
          case 'name-descend': return b.localeCompare(a);
          case 'rarity-ascend':
          case 'rarity-descend': {
            if (!('rarity' in aModel) || !('rarity' in bModel)) return 0;

            return (order === 'rarity-ascend'
              ? bModel.rarity - aModel.rarity
              : aModel.rarity - bModel.rarity
            );
          }
          case 'element-ascend':
          case 'element-descend': {
            if ('element' in aModel && 'element' in bModel) {
              return (order === 'element-ascend'
                ? aModel.element.localeCompare(bModel.element)
                : bModel.element.localeCompare(aModel.element)
              );
            }
            if (ArtifactSet.isArtifactSet(aModel) && ArtifactSet.isArtifactSet(bModel)) {
              const aElement: Element | undefined = getModelElement(aModel);
              const bElement: Element | undefined = getModelElement(bModel);

              return aElement && bElement
                ? order === 'element-ascend'
                  ? aElement.localeCompare(bElement)
                  : bElement.localeCompare(aElement)
                : aElement
                  ? -1
                  : bElement
                    ? 1
                    : 0;
            }
            if (Domain.isDomain(aModel) && Domain.isDomain(bModel)) {
              if (aModel.isBlessing() && bModel.isBlessing()) {
                const aElement = getDomainElement(aModel, DataStore, order);
                const bElement = getDomainElement(bModel, DataStore, order);

                return aElement && bElement
                  ? order === 'element-ascend'
                    ? aElement.localeCompare(bElement)
                    : bElement.localeCompare(aElement)
                  : aElement
                    ? -1
                    : bElement
                      ? 1
                      : 0;
              }
              // TODO: Implement remaining domains
            }
          }
          default: return 0;
        }
      })] as const;
  });

  return (<>
    <aside>
      <nav>
        <ul>
          {routes.map(([route, name]) => (
            <li key={route}>
              <details open className={classNames('data-route', `data-route--${route}`)}>
                <summary>
                  <Link to={`/${DATA_PREFIX}/${route}`}>{name}</Link>
                </summary>
                <ul>
                  {groups.find(([group]) => group === route)?.[1].map(name => {
                    const model = groupModels.get(route)?.find(m => m.name === name);
                    const element = (
                      route === 'characters' ? (model as Character).element
                        : route === 'artifacts' ? getModelElement(model as ArtifactSet)
                          : route === 'domains' && getDomainElement(model as DomainOfBlessing, DataStore, order)
                    );

                    return (
                      <li key={name}>
                        {element ? <ElementImage element={element} /> : null}
                        <Link to={`/${DATA_PREFIX}/${route}/${name}`}>{name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    <main>
      <header>
        <div className="input-group">
          <input type='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for a model...' />
          <Select name="order" value={order} onChange={order => setOrder(order as Order)}
            options={['name', 'rarity', 'element'].flatMap(orderBy => [`${orderBy}-ascend`, `${orderBy}-descend`])}
            displayValue={value => pascalCaseFromKebabCase(value).replace('Ascend', '⬆️').replace('Descend', '⬇️')}
          />
        </div>
      </header>
      <section>
        {sortedGroups.map(([group, names]) => (
          <details key={group} open>
            <summary>
              <Link to={`/${DATA_PREFIX}/${group}`}>{pascalCaseFromSnakeCase(group)}</Link>
            </summary>
            <ul className='data-details-list'>
              {names.map(name => {
                const model = (
                  group === 'characters' ? Characters.find(c => c.name === name)
                    : group === 'artifacts' ? Artifacts.find(a => a.name === name)
                      : group === 'domains' ? Domains.find(d => d.name === name)
                        : group === 'materials' ? Materials.find(m => m.name === name)
                          : group === 'mobs' ? Mobs.find(m => m.name === name)
                            : undefined
                );
                const element = (
                  group === 'characters' ? (model as Character).element
                    : group === 'artifacts' ? getModelElement(model as ArtifactSet)
                      : group === 'domains' && getDomainElement(model as DomainOfBlessing, DataStore, order)
                );

                return (
                  <li key={name}>
                    <Link to={`/${DATA_PREFIX}/${group}/${name}`} title={name}>
                      {group === 'characters' && <CharacterImage character={name} />}
                      {group === 'artifacts' && <ArtifactImage set={name} piece='Flower' />}
                      {group === 'domains' && <DomainImage domain={name} />}
                      {group === 'materials' && <MaterialImage material={name} />}
                      {group === 'mobs' && <MobImage mob={name} />}
                      <header>
                        <p className='model-name'>
                          <span>{name}</span>
                          {element ? <ElementImage element={element} /> : null}
                        </p>
                        {model
                          ? 'rarity' in model || Mob.isMob(model)
                            ? <RarityList rarity={'rarity' in model ? model.rarity : getRarityFromMob(model)} />
                            : undefined
                          : <p>Unknown model</p>
                        }
                      </header>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </section>
    </main>
  </>);
}