import { UpdateCheckResult } from '@/services/UpdateService/types';

export interface ElectronAPI {
  checkForUpdates: () => Promise<UpdateCheckResult>;
  getAppVersion: () => Promise<string>;
  
  // LocalStorage import/export functionality (full data backup/restore)
  getAllLocalStorageData: () => Promise<Record<string, any> | null>;
  setAllLocalStorageData: (data: Record<string, any>) => Promise<void>;
  
  // Update download progress listener
  onUpdateDownloadProgress: (callback: (progress: any) => void) => void;
  removeUpdateDownloadProgressListener: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
