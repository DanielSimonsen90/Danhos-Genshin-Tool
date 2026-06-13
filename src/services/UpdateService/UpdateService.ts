import { BrowserWindow, dialog, shell, app, autoUpdater } from 'electron';
import { PROJECT_GITHUB_URL } from '@/common/constants/domain';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { IgnoredVersionService } from './IgnoredVersionService';
import {
  RepoInfo,
  UpdateFoundResponseOptions,
  UpdateReadyResponseOptions,
  UpdateErrorResponseOptions,
  UpdateCheckResult,
  UpdateDownloadProgress,
} from './types';

/**
 * Service for checking and managing application updates via Electron autoUpdater.
 * Provides in-app update checks, background download notifications, and install prompts.
 */
export const UpdateService = new class UpdateService {
  public readonly CHECK_FOR_UPDATE_DELAY_MS = 3000; // Delay before checking for updates after app launch
  private readonly UPDATE_CHECK_TIMEOUT_MS = 30000;

  private mainWindow: BrowserWindow | null = null;
  private isCheckingForUpdates = false;
  private isAutoUpdaterConfigured = false;
  private hasRegisteredAutoUpdaterEvents = false;

  public setMainWindow(window: BrowserWindow) {
    this.mainWindow = window;
  }

  private _getRepoInfo(): RepoInfo {
    // Extract owner and repo from PROJECT_GITHUB_URL
    const url = PROJECT_GITHUB_URL.replace('https://github.com/', '');
    const [owner, repo] = url.split('/');
    return { owner, repo };
  }

  private _getUpdateFeedUrl(): string {
    const { owner, repo } = this._getRepoInfo();
    return `https://update.electronjs.org/${owner}/${repo}/${process.platform}-${process.arch}/${app.getVersion()}`;
  }

  private _emitUpdateDownloadProgress(progress: UpdateDownloadProgress): void {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
    this.mainWindow.webContents.send('update-download-progress', progress);
  }

  private _configureAutoUpdater(): void {
    if (this.isAutoUpdaterConfigured) return;

    autoUpdater.setFeedURL({ url: this._getUpdateFeedUrl() });
    this.isAutoUpdaterConfigured = true;
  }

  private _registerAutoUpdaterEvents(): void {
    if (this.hasRegisteredAutoUpdaterEvents) return;

    autoUpdater.on('update-downloaded', async (_event, _releaseNotes, releaseName) => {
      const latestVersion = releaseName || 'latest version';

      if (IgnoredVersionService.isVersionIgnored(latestVersion)) return;

      this._emitUpdateDownloadProgress({
        stage: 'downloaded',
        latestVersion,
      });

      const response = await this._showDialog({
        type: 'info',
        title: 'Update Ready',
        message: `Update ${latestVersion} is ready to install.`,
        detail: 'Restart now to install the update?',
        buttons: [
          'Restart and install',
          'Install later',
          'Ignore this update'
        ],
        defaultId: 0,
        cancelId: 1,
      });

      if (response === null) return;

      switch (response) {
        case UpdateReadyResponseOptions.InstallNow:
          autoUpdater.quitAndInstall();
          return;
        case UpdateReadyResponseOptions.InstallLater:
          return;
        case UpdateReadyResponseOptions.IgnoreThisUpdate:
          IgnoredVersionService.ignoreVersion(latestVersion);
          return;
      }
    });

    this.hasRegisteredAutoUpdaterEvents = true;
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

    if (process.platform !== 'win32' && process.platform !== 'darwin') {
      this.isCheckingForUpdates = false;
      return {
        updateAvailable: false,
        currentVersion,
        error: 'Auto-updates are only supported on Windows and macOS builds'
      };
    }

    try {
      this._configureAutoUpdater();
      this._registerAutoUpdaterEvents();

      const updateResult = await new Promise<UpdateCheckResult>((resolve) => {
        let settled = false;

        const resolveOnce = (result: UpdateCheckResult) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          autoUpdater.removeListener('update-available', onUpdateAvailable);
          autoUpdater.removeListener('update-not-available', onUpdateNotAvailable);
          autoUpdater.removeListener('error', onError);
          resolve(result);
        };

        const onUpdateAvailable = async (_event: unknown, _releaseNotes: string, releaseName: string) => {
          const latestVersion = releaseName || 'latest version';
          const isVersionIgnored = IgnoredVersionService.isVersionIgnored(latestVersion);

          if (isVersionIgnored) {
            if (showNoUpdateDialog) await this._showNoUpdateDialog();
            resolveOnce({
              updateAvailable: false,
              currentVersion,
              latestVersion,
            });
            return;
          }

          this._emitUpdateDownloadProgress({
            stage: 'downloading',
            latestVersion,
          });

          await this._showUpdateAvailableDialog(latestVersion);
          resolveOnce({
            updateAvailable: true,
            currentVersion,
            latestVersion,
          });
        };

        const onUpdateNotAvailable = async () => {
          if (showNoUpdateDialog) await this._showNoUpdateDialog();
          resolveOnce({
            updateAvailable: false,
            currentVersion,
          });
        };

        const onError = (error: Error) => {
          if (showNoUpdateDialog) this._showUpdateErrorDialog();
          resolveOnce({
            updateAvailable: false,
            currentVersion,
            error: error.message || 'Unknown update error'
          });
        };

        const timeout = setTimeout(() => {
          resolveOnce({
            updateAvailable: false,
            currentVersion,
            error: 'Update check timed out'
          });
        }, this.UPDATE_CHECK_TIMEOUT_MS);

        autoUpdater.once('update-available', onUpdateAvailable);
        autoUpdater.once('update-not-available', onUpdateNotAvailable);
        autoUpdater.once('error', onError);

        autoUpdater.checkForUpdates();
      });

      return updateResult;
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
  private async _showUpdateAvailableDialog(latestVersion: string) {
    const response = await this._showDialog({
      type: 'info',
      title: 'Update Available!',
      message: `A new version, ${latestVersion}, is available!`,
      detail: 'The update is now downloading in the background. You will be prompted to install once ready.',
      buttons: [
        'OK',
        'View release page',
        'Ignore this update'
      ],
      defaultId: 0,
      cancelId: 0,
    });

    if (response === null) return;

    switch (response) {
      case UpdateFoundResponseOptions.OK:
        return;
      case UpdateFoundResponseOptions.ViewReleasePage:
        return await shell.openExternal(`${PROJECT_GITHUB_URL}/releases`);
      case UpdateFoundResponseOptions.IgnoreThisUpdate:
        return IgnoredVersionService.ignoreVersion(latestVersion);
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