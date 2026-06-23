import { useCallback, useState, PropsWithChildren } from 'react';
import ConfirmModal from '@/providers/ConfirmProvider/components/ConfirmModal';
import type { ConfirmOptions, PendingConfirm } from './ConfirmProviderTypes';
import { ConfirmContext } from './ConfirmProviderConstants';

export default function ConfirmProvider({ children }: PropsWithChildren) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      setPending(prev => {
        prev?.resolve(false); // Cancel any previous pending confirmation
        return { ...options, resolve };
      });
    });
  }, []);

  const handleConfirm = () => {
    pending?.resolve(true);
    setPending(null);
  };

  const handleCancel = () => {
    pending?.resolve(false);
    setPending(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmModal
        open={pending !== null}
        onClose={handleCancel}
        title={pending?.title}
        message={pending?.message ?? ''}
        actions={[
          { 
            label: pending?.cancelText ?? 'Cancel',
            onClick: handleCancel,
            className: 'tertiary'
          },
          {
            label: pending?.confirmText ?? 'Confirm',
            onClick: handleConfirm,
            className: `primary ${pending?.destructive ? 'danger' : 'brand'}`
          },
        ]}
      />
    </ConfirmContext.Provider>
  );
}
