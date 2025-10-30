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
      return running ? "Pause" : "Fortsetzen";
    };


  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
      <button
        onClick={onToggleRunning}
        className="appearance-none w-36 px-6 py-2.5 rounded-lg font-semibold 
                  text-neutral-100
                  bg-gradient-to-b from-neutral-700 to-neutral-800 
                  border border-neutral-900 border-t-neutral-600 
                  hover:from-neutral-600 hover:to-neutral-700
                  active:scale-[0.98] transition-all duration-200 
                  shadow-lg shadow-black/40"
        disabled={finished}
      >
        {getStartPauseText()}
      </button>
      <button
        onClick={onCheck}
        className={
          "appearance-none w-36 px-8 py-2.5 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/40 " +
          (canCheck && running
            ? "text-neutral-100 bg-gradient-to-b from-neutral-700 to-neutral-800 border border-neutral-900 border-t-neutral-600 hover:from-neutral-600 hover:to-neutral-700"
            : "bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-900")
        }
        disabled={!canCheck || !running}
      >
        Prüfen
      </button>
      <button
        onClick={onReset}
        className="appearance-none w-36 px-5 py-2.5 rounded-lg font-semibold 
                  text-neutral-400 
                  bg-neutral-800 
                  border border-neutral-900 border-t-neutral-700
                  hover:bg-neutral-700 hover:text-neutral-200
                  active:scale-[0.98] transition-all duration-200 
                  shadow-lg shadow-black/40"
      >
        Zurücksetzen
      </button>
    </div>
  );
}
