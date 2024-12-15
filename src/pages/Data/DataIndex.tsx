import { classNames, pascalCaseFromSnakeCase } from '@/common/functions/strings';
import { CharacterImage, ArtifactImage, DomainImage } from '@/components/common/Images';
import { useDataStore } from '@/stores';
import { Link } from 'react-router-dom';

const DATA_PREFIX = 'data';
const routes = [
  ['characters', 'Characters'],
  ['artifacts', 'Artifacts'],
  ['domains', 'Domains'],
  //  ['weapons', 'Weapons'],
  //  ['materials', 'Materials'],
];

export default function DataIndex() {
  const { CharacterNames, ArtifactNames, DomainNames } = useDataStore();
  const groups = [
    ['characters', CharacterNames],
    ['artifacts', ArtifactNames],
    ['domains', DomainNames],
  ] as const;

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
                  {groups.find(([group]) => group === route)?.[1].map(name => (
                    <li key={name}>
                      <Link to={`/${DATA_PREFIX}/${route}/${name}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    <main>
      {groups.map(([group, names]) => (
        <details key={group} open>
          <summary>
            <Link to={`/${DATA_PREFIX}/${group}`}>{pascalCaseFromSnakeCase(group)}</Link>
          </summary>
          <ul className='data-details-list'>
            {names.map(name => (
              <li key={name}>
                <Link to={`/${DATA_PREFIX}/${group}/${name}`}>
                  {group === 'characters' && <CharacterImage character={name} />}
                  {group === 'artifacts' && <ArtifactImage set={name} piece='Flower' />}
                  {group === 'domains' && <DomainImage domain={name} />}
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </main>
  </>);
}