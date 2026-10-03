import { UpdateCheckResult, UpdateDownloadProgress } from '@/services/UpdateService/types';
import { FetchImageRequest, FetchImageResult } from './images';

export interface ElectronAPI {
  checkForUpdates: () => Promise<UpdateCheckResult>;
  getAppVersion: () => Promise<string>;

  // Development only - resolves an image from disk or trusted providers and stores it locally
  fetchImage: (request: FetchImageRequest) => Promise<FetchImageResult>;

  // LocalStorage import/export functionality (full data backup/restore)
  getAllLocalStorageData: () => Promise<Record<string, any> | null>;
  setAllLocalStorageData: (data: Record<string, any>) => Promise<void>;
  
  // Update download progress listener
  onUpdateDownloadProgress: (callback: (progress: UpdateDownloadProgress) => void) => void;
  removeUpdateDownloadProgressListener: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
