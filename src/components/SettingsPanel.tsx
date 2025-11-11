import { useState } from 'react';

interface SettingsPanelProps {
  currentTimeSecs: number;
  currentPairs: Array<[string, string]>;
  onSave: (newTimeSecs: number) => void;
  onClose: () => void;
  onReset: () => void;
  onToggleRunning: () => void;
  running: boolean;
  hasStarted: boolean;
}

export default function SettingsPanel({ currentTimeSecs, 
  onSave, 
  onClose, 
  onReset, 
  onToggleRunning, 
  running, 
  hasStarted 
}: SettingsPanelProps) {
  const [hours, setHours] = useState(Math.floor(currentTimeSecs / 3600));
  const [minutes, setMinutes] = useState(Math.floor((currentTimeSecs % 3600) / 60));
  // const [showPairs, setShowPairs] = useState(false);

  const handleSave = () => {
    const newSecs: number = (hours * 3600) + (minutes * 60);

    if (newSecs <= 0) {
      alert('Time must be greater than 0');
      return;
    }
  
    onSave(newSecs);
    onClose();
  };

  const getStartPauseText = (): string => {
    if (!hasStarted) return "Start";
    return running ? "Spiel pausieren" : "Spiel fortsetzen";
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Einstellungen</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* GAME-ACTIONS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-wider">
            Spiel-Aktionen
          </label>
          <div className="flex flex-col gap-3">
            {/* Pause/Fortsetzen-Button */}
            <button
              onClick={onToggleRunning}
              className="w-full px-4 py-3 bg-yellow-600/80 hover:bg-yellow-700/80 rounded-lg text-white font-medium transition-colors"
            >
              {getStartPauseText()}
            </button>
            {/* Reset-Button */}
            <button
              onClick={() => {
                if (window.confirm('Bist du sicher, dass du das gesamte Spiel zurücksetzen möchtest?')) {
                  onReset();
                  onClose();
                }
              }}
              className="w-full px-4 py-3 bg-red-800 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
            >
              Spiel zurücksetzen
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* TIME SETTINGS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-wider">
            Zeitlimit anpassen
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                className="no-spinner w-full bg-black/40 border border-white/20 
                rounded-xl px-4 py-3 text-white text-xl text-center font-semibold 
                focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="0"
              />
              <p className="text-white/50 text-xs mt-1 text-center">Stunden</p>
            </div>
            <div className="flex items-center text-white/40 text-2xl pb-6">:</div>
            <div className="flex-1">
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="no-spinner w-full bg-black/40 border border-white/20 
                rounded-xl px-4 py-3 text-white text-xl text-center font-semibold 
                focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="0"
              />
              <p className="text-white/50 text-xs mt-1 text-center">Minuten</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* PAIRS SECTION */}
        {/* ═══════════════════════════════════════════════════════ */}
        {/*
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-white">
              ZIEL-PAARE
            </label>
            <button
              onClick={() => setShowPairs(!showPairs)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
            >
              {showPairs ? (
                <>
                  <span className="material-icons text-base">visibility</span>
                </>
              ) : (
                <>
                  <span className="material-icons text-base">visibility_off</span>
                </>
              )}
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {currentPairs.map((pair, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-lg px-3 py-2"
              >
                <span className="font-mono text-lg font-bold text-white bg-black px-3 py-1.5 rounded border border-white/20">
                  {showPairs ? pair[0] : '●'}
                </span>
                <span className="font-mono text-lg font-bold text-white bg-black px-3 py-1.5 rounded border border-white/20">
                  {showPairs ? pair[1] : '●'}
                </span>
              </div>
            ))}
          </div>
        </div>
        */}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ACTIONS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
            Speichern
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
          >
            Abbrechen
          </button>
        </div>

        <p className="text-white/40 text-xs mt-4 text-center">
          Änderungen beziehen sich nur auf die aktuelle Session!
        </p>
      </div>
    </div>
  );
}
