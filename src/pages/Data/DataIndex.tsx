import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getElement } from '@/data/elements';

import { Element } from '@/common/types';
import { ArtifactSet, Character, Model, List, Domain, DomainOfBlessing } from '@/common/models';
import { classNames, pascalCaseFromKebabCase, pascalCaseFromSnakeCase } from '@/common/functions/strings';

import RarityList from '@/components/common/icons/Rarity';
import Select from '@/components/common/Select';
import { CharacterImage, ArtifactImage, DomainImage, ElementImage } from '@/components/common/Images';

import { DataStore, useDataStore } from '@/stores';

const DATA_PREFIX = 'data';
const routes = [
  ['characters', 'Characters'],
  ['artifacts', 'Artifacts'],
  ['domains', 'Domains'],
  //  ['weapons', 'Weapons'],
  //  ['materials', 'Materials'],
];

type Order = `${'name' | 'rarity' | 'element'}-${'ascend' | 'descend'}`;

const getModelElement = (model: ArtifactSet): Element | undefined => [
  model.twoPieceSetDescription,
  model.fourPieceSetDescription,
].map(getElement).find(Boolean);
const getDomainElement = (domain: DomainOfBlessing, dataStore: DataStore, order: Order): Element | undefined => domain.getRewards(dataStore)
  .map(artifactSet => getModelElement(artifactSet))
  .filter(Boolean)
  .sort((a, b) => order === 'element-ascend' ? a.localeCompare(b) : b.localeCompare(a))
[0];

export default function DataIndex() {
  const dataStore = useDataStore();
  const {
    CharacterNames, ArtifactNames, DomainNames,
    Characters, Artifacts, Domains,
  } = dataStore;
  const groups = [
    ['characters', CharacterNames],
    ['artifacts', ArtifactNames],
    ['domains', DomainNames],
  ] as const;
  const groupModels = new Map<string, List<Model>>([
    ['characters', Characters],
    ['artifacts', Artifacts],
    ['domains', Domains],
  ]);

  const [order, setOrder] = useState<Order>('name-ascend');
  const sortedGroups = groups.map(([group, names]) => {
    const models = groupModels.get(group);
    return [group, names.sort((a, b) => {
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
              const aElement = getDomainElement(aModel, dataStore, order);
              const bElement = getDomainElement(bModel, dataStore, order);

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
                    const element = route === 'characters' ? (model as Character).element
                      : route === 'artifacts' ? getModelElement(model as ArtifactSet)
                      : route === 'domains' && getDomainElement(model as DomainOfBlessing, dataStore, order);

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
      {sortedGroups.map(([group, names]) => (
        <details key={group} open>
          <summary>
            <Link to={`/${DATA_PREFIX}/${group}`}>{pascalCaseFromSnakeCase(group)}</Link>
            <Select name="order" value={order} onChange={order => setOrder(order as Order)}
              options={['name', 'rarity', 'element'].flatMap(orderBy => [`${orderBy}-ascend`, `${orderBy}-descend`])}
              displayValue={value => pascalCaseFromKebabCase(value).replace('Ascend', '⬆️').replace('Descend', '⬇️')}
            />
          </summary>
          <ul className='data-details-list'>
            {names.map(name => {
              const model = group === 'characters' ? Characters.find(c => c.name === name)
                : group === 'artifacts' ? Artifacts.find(a => a.name === name)
                  : Domains.find(d => d.name === name);
              const element = group === 'characters' ? (model as Character).element
                : group === 'artifacts' ? getModelElement(model as ArtifactSet)
                  : group === 'domains' && getDomainElement(model as DomainOfBlessing, dataStore, order);

              return (
                <li key={name}>
                  <Link to={`/${DATA_PREFIX}/${group}/${name}`}>
                    {group === 'characters' && <CharacterImage character={name} />}
                    {group === 'artifacts' && <ArtifactImage set={name} piece='Flower' />}
                    {group === 'domains' && <DomainImage domain={name} />}
                    <header>
                      <p className='model-name'>
                        <span>{name}</span>
                        {element ? <ElementImage element={element} /> : null}
                      </p>
                      {'rarity' in model ? <RarityList rarity={model?.rarity} /> : <span>{model.region}</span>}
                    </header>
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </main>
  </>);
}