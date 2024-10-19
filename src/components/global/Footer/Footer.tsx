import { DEVELOPER, DEVELOPER_GITHUB_URL, PROJECT_GITHUB_URL, DOMAIN_NAME } from '@/common/constants/domain';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <p>Developed by <a href={DEVELOPER_GITHUB_URL} target="_blank" rel="noopener noreferrer">{DEVELOPER}</a></p>
      <p>&copy; {new Date().getFullYear()} {DOMAIN_NAME}. All rights reserved.</p>
      <p>View on <a href={PROJECT_GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </footer>
  );
}