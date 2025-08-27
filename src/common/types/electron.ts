import { UpdateCheckResult } from '@/services/UpdateService/types';

export interface ElectronAPI {
  checkForUpdates: () => Promise<UpdateCheckResult>;
  getAppVersion: () => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
