interface ControlButtonsProps {
  running: boolean;
  hasStarted: boolean;
  finished: boolean;
  canCheck: boolean;
  onToggleRunning: () => void;
  onCheck: () => void;
  onReset: () => void;
}

export default function ControlButtons({ 
  running, 
  hasStarted,
  finished, 
  canCheck, 
  onToggleRunning, 
  onCheck, 
  onReset 
}: ControlButtonsProps) {

  const getStartPauseText = (): string => {
      if (!hasStarted) return "Start";
      return running ? "Pause" : "Resume";
    };


  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
      <button
        onClick={onToggleRunning}
        className="px-6 py-3 rounded-full bg-white font-medium hover:opacity-90 active:opacity-80 transition disabled:opacity-50"
        disabled={finished}
        aria-label={running ? "Timer pausieren" : "Timer starten"}
        aria-pressed={running}
      >
        {getStartPauseText()}
      </button>

      <button
        onClick={onCheck}
        className={
          "px-8 py-3 rounded-full font-medium transition " +
          (canCheck
            ? "bg-white/10 hover:bg-white/20"
            : "bg-white/5 text-white/60 cursor-not-allowed")
        }
        disabled={!canCheck || !running}
        aria-label="Eingabe prüfen"
      >
        Check
      </button>

      <button
        onClick={onReset}
        className="px-5 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
        aria-label="Spiel zurücksetzen"
      >
        Reset
      </button>
    </div>
  );
}
