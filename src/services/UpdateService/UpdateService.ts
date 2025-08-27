import { BrowserWindow, dialog, shell, app } from 'electron';
import { PROJECT_GITHUB_URL } from '@/common/constants/domain';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { IgnoredVersionService } from './IgnoredVersionService';
import { GitHubRelease, RepoInfo, UpdateAvailableResponseOptions, UpdateErrorResponseOptions, UpdateCheckResult } from './types';

/**
 * Service for checking and managing application updates using GitHub releases API.
 * Provides functionality to check for updates, ignore specific versions, and direct users to download new releases.
 */
export const UpdateService = new class UpdateService {
  public readonly CHECK_FOR_UPDATE_DELAY_MS = 3000; // Delay before checking for updates after app launch

  private mainWindow: BrowserWindow | null = null;
  private isCheckingForUpdates = false;
  public setMainWindow(window: BrowserWindow) {
    this.mainWindow = window;
  }

  private _findWindowsInstaller(assets: GitHubRelease['assets']) {
    return assets.find(asset =>
      asset.name.includes('Setup.exe') ||
      asset.name.includes('.exe') ||
      asset.name.includes('windows')
    );
  }
  private _getRepoInfo(): RepoInfo {
    // Extract owner and repo from PROJECT_GITHUB_URL
    const url = PROJECT_GITHUB_URL.replace('https://github.com/', '');
    const [owner, repo] = url.split('/');
    return { owner, repo };
  }

  /**
   * Compare two semantic version strings.
   * @param current The current version
   * @param latest The latest version to compare against
   * @returns -1 if current < latest, 1 if current > latest, 0 if equal
   */
  private _compareVersions(current: string, latest: string): number {
    // Remove 'v' prefix if present
    const [currentClean, latestClean] = [current, latest].map(v => v.replace(/^v/, ''));
    const [currentParts, latestParts] = [currentClean, latestClean].map(v => v.split('.').map(Number));

    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const latestPart = latestParts[i] || 0;

      if (currentPart < latestPart) return -1;
      if (currentPart > latestPart) return 1;
    }

    return 0;
  }  
  public async checkForUpdates(showNoUpdateDialog = false): Promise<UpdateCheckResult> {
    console.log('UpdateService.checkForUpdates called', { showNoUpdateDialog, isChecking: this.isCheckingForUpdates });
    
    if (this.isCheckingForUpdates) {
      const result = {
        updateAvailable: false,
        currentVersion: app.getVersion(),
        error: 'Update check already in progress'
      };
      console.log('Already checking, returning:', result);
      return result;
    }
    
    this.isCheckingForUpdates = true;
    const currentVersion = app.getVersion();

    // Only check for updates in production builds
    if (IS_DEVELOPMENT_ENVIRONMENT && !app.isPackaged) {
      this.isCheckingForUpdates = false;
      if (showNoUpdateDialog) this._showNoUpdateDialog();
      const result = {
        updateAvailable: false,
        currentVersion,
        error: 'Development environment - updates disabled'
      };
      console.log('Development mode, returning:', result);
      return result;
    }

    try {
      const { owner, repo } = this._getRepoInfo();
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);

      const latestRelease: GitHubRelease = await response.json();

      // Compare versions
      const versionComparison = this._compareVersions(currentVersion, latestRelease.tag_name);

      if (versionComparison < 0) {
        const isVersionIgnored = IgnoredVersionService.isVersionIgnored(latestRelease.tag_name);
        if (isVersionIgnored && showNoUpdateDialog) this._showNoUpdateDialog();
        else if (!isVersionIgnored) this._showUpdateAvailableDialog(latestRelease);

        return {
          updateAvailable: !isVersionIgnored,
          currentVersion,
          latestVersion: latestRelease.tag_name
        };
      } else {
        // No update available
        if (showNoUpdateDialog) this._showNoUpdateDialog();
        return {
          updateAvailable: false,
          currentVersion,
          latestVersion: latestRelease.tag_name
        };
      }
    } catch (error) {
      if (showNoUpdateDialog) this._showUpdateErrorDialog();
      return {
        updateAvailable: false,
        currentVersion,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      this.isCheckingForUpdates = false;
    }
  }

  private async _showDialog(options: Electron.MessageBoxOptions): Promise<number | null> {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return null;
    const response = await dialog.showMessageBox(this.mainWindow, options);
    return response.response;
  }
  private async _showUpdateAvailableDialog(release: GitHubRelease) {
    const windowsInstaller = this._findWindowsInstaller(release.assets);

    const response = await this._showDialog({
      type: 'info',
      title: 'Update Available!',
      message: `A new version, ${release.tag_name}, is available!`,
      detail: `${release.name}\n\nWould you like to download and install the update?`,
      buttons: [
        `Update to ${release.tag_name}`,
        'View release page',
        'Update later',
        'Ignore this update'
      ],
      defaultId: 0,
      cancelId: 2,
    });

    if (response === null) return;

    switch (response) {
      case UpdateAvailableResponseOptions.UpdateNow: return windowsInstaller
        ? await shell.openExternal(windowsInstaller.browser_download_url)
        : await shell.openExternal(release.html_url);
      case UpdateAvailableResponseOptions.ViewReleasePage: return await shell.openExternal(release.html_url);
      case UpdateAvailableResponseOptions.UpdateLater: return;
      case UpdateAvailableResponseOptions.IgnoreThisUpdate: return IgnoredVersionService.ignoreVersion(release.tag_name);
    }
  }
  private async _showNoUpdateDialog() {
    await this._showDialog({
      type: 'info',
      title: 'No Updates',
      message: 'You are running the latest version.',
      detail: `Current version: ${app.getVersion()}`,
      buttons: ['OK'],
    });
  }
  private async _showUpdateErrorDialog() {
    const response = await this._showDialog({
      type: 'error',
      title: 'Update Check Failed',
      message: 'Failed to check for updates.',
      detail: 'Please check your internet connection and try again, or visit the releases page manually.',
      buttons: ['Retry', 'Check Manually', 'OK'],
      defaultId: 0,
      cancelId: 2,
    });

    if (response === null) return;

    switch (response) {
      case UpdateErrorResponseOptions.Retry: return setTimeout(() => this.checkForUpdates(true), 2000);
      case UpdateErrorResponseOptions.CheckManually: return await shell.openExternal(`${PROJECT_GITHUB_URL}/releases`);
      case UpdateErrorResponseOptions.OK: return;
    }
  }
};

export default UpdateService;