// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import type { FetchImageRequest } from './common/types/images';

// Expose update functionality to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  fetchImage: (request: FetchImageRequest) => ipcRenderer.invoke('fetch-image', request),

  // LocalStorage import/export functionality (full data backup/restore)
  getAllLocalStorageData: () => ipcRenderer.invoke('get-all-localstorage-data'),
  setAllLocalStorageData: (data: any) => ipcRenderer.invoke('set-all-localstorage-data', data),
  
  // Listen for update download progress
  onUpdateDownloadProgress: (callback: (progress: any) => void) => {
    ipcRenderer.on('update-download-progress', (_, progress) => callback(progress));
  },
  
  // Remove listener for update download progress
  removeUpdateDownloadProgressListener: () => {
    ipcRenderer.removeAllListeners('update-download-progress');
  },
});
