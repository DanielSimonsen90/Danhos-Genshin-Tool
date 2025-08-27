export const DOMAIN_NAME = `Danho's Genshin Tool` as const;
export const DEVELOPER = 'Daniel Simonsen' as const;
export const DEVELOPER_GITHUB_URL = `https://github.com/DanielSimonsen90` as const;
export const PROJECT_GITHUB_URL = `${DEVELOPER_GITHUB_URL}/${DOMAIN_NAME.replace("'", "").replace(/ /g, '-')}`;
export const PROJECT_GITHUB_CREATE_ISSUE_URL = `${PROJECT_GITHUB_URL}/issues/new`;

export const GENSHIN_IMPACT_URL = `https://genshin.hoyoverse.com/en/` as const;