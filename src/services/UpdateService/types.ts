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

export type UpdateDownloadStage = 'downloading' | 'downloaded';

export interface UpdateDownloadProgress {
  stage: UpdateDownloadStage;
  latestVersion: string;
}

export enum UpdateFoundResponseOptions {
  OK,
  ViewReleasePage,
  IgnoreThisUpdate
}

export enum UpdateReadyResponseOptions {
  InstallNow,
  InstallLater,
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
