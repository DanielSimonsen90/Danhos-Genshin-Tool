import { Link } from 'react-router-dom';

const DATA_PREFIX = 'data'
const routes = [
  ['characters', 'Characters'],
  ['artifacts', 'Artifacts'],
  ['domains', 'Domains'],
  //  ['weapons', 'Weapons'],
  //  ['materials', 'Materials'],
]

export default function DataIndex() {
  /*
  
  === TODO ===
  * Create compact tree-structure aside for routes and their children
  * Create cozy tree-structure main content for routes and their children
  
  */

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'center',
    }}>
      <h1>Data Information</h1>
      {routes.map(([path, name]) => (
        <Link key={path} to={`/${DATA_PREFIX}/${path}`}>{name}</Link>
      ))}
    </div>
  )
}