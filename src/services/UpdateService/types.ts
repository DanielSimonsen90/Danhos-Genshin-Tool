export interface GitHubRelease {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
  body: string;
}

export interface RepoInfo {
  owner: string;
  repo: string;
}

export enum UpdateAvailableResponseOptions {
  UpdateNow,
  ViewReleasePage,
  UpdateLater,
  IgnoreThisUpdate
}

export enum UpdateErrorResponseOptions {
  Retry,
  CheckManually,
  OK
}

export interface UpdateCheckResult {
  updateAvailable: boolean;
  latestVersion?: string;
  currentVersion: string;
  error?: string;
}
