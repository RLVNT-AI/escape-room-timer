import { useState } from 'react';
import { DEFAULT_TIME_SECS, ADMIN_PASSWORD, DEFAULT_PAIRS } from '../defaults';

interface UseSettingsReturn {
  showPasswordModal: boolean,
  showPanel: boolean;
  timeSecs: number;
  targetPairs: Array<[string, string]>;
  requestOpen: () => void;
  cancelPassword: () => void;
  submitPassword: (password: string) => void;
  closePanel: () => void;
  saveSettings: (newTimeSecs: number) => void;
  // savePairs: (newPairs: Array<[string, string]>) => void;
}

export function useSettings(): UseSettingsReturn {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [timeSecs, setTimeSecs] = useState(DEFAULT_TIME_SECS);
  const [targetPairs, _] = useState(DEFAULT_PAIRS);

  const requestOpen = () => {
    setShowPasswordModal(true);
  };

  const cancelPassword = () => {
    setShowPasswordModal(false);
  };

  const submitPassword = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false);
      setShowPanel(true);
    } else {
      alert('Falsches Passwort!');
    }
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  const saveSettings = (newTimeSecs: number) => {
    setTimeSecs(newTimeSecs);
  };

  return {
    showPasswordModal,
    showPanel,
    timeSecs,
    targetPairs: targetPairs,
    requestOpen,
    cancelPassword,
    submitPassword,
    closePanel,
    saveSettings
  };
}
