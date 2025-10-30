import { useTimer } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { usePuzzle } from './hooks/usePuzzle';
import { useGameEffects } from './hooks/useGameEffects';
import { useSettings } from './hooks/useSettings';
import TimerDisplay from './components/TimerDisplay';
import PuzzleGrid from './components/PuzzleGrid';
import ControlButtons from './components/ControlButtons';
import FinishOverlay from './components/FinishOverlay';
import SettingsPanel from './components/SettingsPanel';
import PasswordModal from './components/PasswordModal';

export default function EscapeRoomTimer() {
  const settings = useSettings();
  const timer = useTimer(settings.timeSecs);
  const audio = useAudio();
  const puzzle = usePuzzle(audio, timer.setTimeLeft, settings.targetPairs);

  useGameEffects({ timer, audio, puzzle });

  // HANDLERS
  const handleSettingsSave = (newTimeSecs: number) => {
    settings.saveSettings(newTimeSecs);
    timer.reset(newTimeSecs);
    puzzle.reset();
  };

  const handleReset = () => {
    timer.reset();
    puzzle.reset();
  };

  // FLASH BACKDROP
  const backdrop =
    puzzle.flash === "success"
      ? "after:content-[''] after:fixed after:inset-0 after:bg-green-500/30 after:pointer-events-none after:z-30"
      : puzzle.flash === "error"
      ? "after:content-[''] after:fixed after:inset-0 after:bg-red-600/30 after:pointer-events-none after:z-30"
      : "";

  return (
    <div
      className={`w-full min-h-screen bg-black flex items-center justify-center p-4 ${backdrop}`}
    >
      <div className="w-full max-w-4xl px-6 py-8">
        <audio ref={audio.musicRef} src="audio/escape-room-music.mp3" />
        <audio ref={audio.okRef} src="audio/correct.wav" />
        <audio ref={audio.errRef} src="audio/error.wav" />
        <audio ref={audio.winRef} src="audio/win.mp3" />

        <button
          onClick={settings.requestOpen}
          className="fixed top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/10 border border-white/10 rounded-lg 
          flex items-center justify-center text-white/100 hover:text-white/100 transition-all z-20"
          aria-label="Settings"
        >
          ⚙️
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Lockdown Timer
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Bitte Code eingeben:
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span
              className={
                "px-4 py-2 rounded-full border border-white/10 text-sm font-medium " +
                (timer.running && !puzzle.finished
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : puzzle.finished
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-white/5 text-white/70")
              }
            >
              {puzzle.finished ? "Finished" : 
              timer.hasStarted ? timer.running ? "Die Zeit läuft..." : "Pausiert" 
              : "Warte auf Start..."}
            </span>
          </div>
        </div>

        <TimerDisplay timeLeft={timer.timeLeft} penalty={puzzle.penalty} />

        <PuzzleGrid
          pairInputs={puzzle.pairInputs}
          pairsDone={puzzle.pairsDone}
          finished={puzzle.finished}
          running={timer.running}
          onInputChange={puzzle.handleInput}
          input0Ref={puzzle.input0Ref}
          input1Ref={puzzle.input1Ref}
        />

        <ControlButtons
          running={timer.running}
          hasStarted={timer.hasStarted}
          finished={puzzle.finished}
          canCheck={puzzle.canCheck}
          onToggleRunning={() => timer.setRunning((r) => !r)}
          onCheck={puzzle.check}
          onReset={handleReset}
        />

        {puzzle.finished && (
          <FinishOverlay 
            timeLeft={timer.timeLeft}
            targetPairs={settings.targetPairs}
            onPlayAgain={handleReset} 
          />
        )}

        {settings.showPasswordModal && (
          <PasswordModal
            onSubmit={settings.submitPassword}
            onCancel={settings.cancelPassword}
          />
        )}

        {settings.showPanel && (
          <SettingsPanel
            currentTimeSecs={settings.timeSecs}
            currentPairs={settings.targetPairs}
            onSave={handleSettingsSave}
            onClose={settings.closePanel}
          />
        )}

        <div className="mt-10 text-center text-xs text-white/40 space-y-1">
          <p>
            Tastatur: <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> = Check | {" "}
            <kbd className="px-2 py-1 bg-white/10 rounded">Leertaste</kbd> = Start/Pause
          </p>
        </div>
      </div>
    </div>
  );
}
