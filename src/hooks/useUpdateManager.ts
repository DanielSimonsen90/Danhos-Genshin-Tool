import { useToast } from '@/providers/ToastProvider';
import { useState, useEffect, useCallback, useRef } from 'react';

export const useUpdateManager = () => {
  const toast = useToast();

  const [appVersion, setAppVersion] = useState('');
  const [isCheckingForUpdates, setIsCheckingForUpdates] = useState(false);
  const lastCheckTimeRef = useRef<number>(0);

  const checkForUpdates = useCallback(async () => {
    if (!window.electronAPI || isCheckingForUpdates) return;

    const now = Date.now();
    const timeSinceLastCheck = now - lastCheckTimeRef.current;

    // If within cooldown period, set checking state and wait
    if (timeSinceLastCheck < 5000) {
      setIsCheckingForUpdates(true);
      const remainingCooldown = 5000 - timeSinceLastCheck;
      
      setTimeout(() => {
        setIsCheckingForUpdates(false);
      }, remainingCooldown);
      
      return;
    }
    
    lastCheckTimeRef.current = now;
    setIsCheckingForUpdates(true);

    try {
      const result = await window.electronAPI.checkForUpdates();
      
      if (result.error) toast.error(`Update check failed: ${result.error}`);
      else if (result.updateAvailable) toast.success(`Found update v${result.latestVersion}`);
      else toast.info('You are already on the latest version.');
      
    } catch (error) {
      console.error('Failed to check for updates:', error);
      toast.error('Failed to check for updates');
    } finally {
      setIsCheckingForUpdates(false);
    }
  }, [isCheckingForUpdates, toast]);

  useEffect(() => {
    if (window.electronAPI) window.electronAPI.getAppVersion().then(setAppVersion);
  }, []);

  return {
    appVersion,
    isCheckingForUpdates,
    checkForUpdates,
    isElectronApp: !!window.electronAPI,
  };
};
