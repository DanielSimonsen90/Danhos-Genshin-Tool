import { DEVELOPER, DEVELOPER_GITHUB_URL, PROJECT_GITHUB_URL } from '@/common/constants/domain';

export default function Footer() {
  const sources = [
    { name: 'Hoyoverse', url: 'https://genshin.hoyoverse.com/en/' },
    { name: 'Paimon.moe', url: 'https://paimon.moe/' },
    { name: 'LustonPull', url: 'https://lustonpull.com/' },
    // { name: 'Rerollcdn', url: 'https://rerollcdn.com/' },
  ]
  
  return (
    <footer className='site-footer'>
      <p>Developed by <a href={DEVELOPER_GITHUB_URL} target="_blank" rel="noopener noreferrer">{DEVELOPER}</a></p>
      <p className='disclaimer muted'>
        <span>
          Source data from {sources.map((source, index) => (
            <span key={source.name}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a>
              {index < sources.length - 2 ? ',' : ''}
              {index === sources.length - 2 ? ' &' : ''}
            </span>
          ))}
        </span>
        <span>
          The software is not affiliated with any of the sources.
        </span>
      </p>
      <p>View on <a href={PROJECT_GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </footer>
  );
}