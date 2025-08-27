import { app } from 'electron';
import * as fs from 'fs';
import { join } from 'path';

/**
 * Service for managing ignored application versions.
 * Handles storing and retrieving version ignore preferences.
 */
export const IgnoredVersionService = new class IgnoredVersionService {
  public ignoreVersion(version: string): void {
    try {
      const ignoredVersions = this._getIgnoredVersions();
      if (!ignoredVersions.includes(version)) {
        ignoredVersions.push(version);
        const ignoredVersionsFile = this._getIgnoredVersionsFile();
        fs.writeFileSync(ignoredVersionsFile, JSON.stringify(ignoredVersions, null, 2));
      }
    } catch (error) {
      // Silently handle errors
    }
  }
  public isVersionIgnored(version: string): boolean {
    const ignoredVersions = this._getIgnoredVersions();
    return ignoredVersions.includes(version);
  }
  public clearIgnoredVersions(): void {
    try {
      const ignoredVersionsFile = this._getIgnoredVersionsFile();
      if (fs.existsSync(ignoredVersionsFile)) {
        fs.unlinkSync(ignoredVersionsFile);
      }
    } catch (error) {
      // Silently handle errors
    }
  }
  private _getIgnoredVersionsFile(): string {
    return join(app.getPath('userData'), 'ignored-versions.json');
  }
  private _getIgnoredVersions(): string[] {
    try {
      const ignoredVersionsFile = this._getIgnoredVersionsFile();
      if (fs.existsSync(ignoredVersionsFile)) {
        const data = fs.readFileSync(ignoredVersionsFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      // Silently handle errors
    }
    return [];
  }
};

export default IgnoredVersionService;
