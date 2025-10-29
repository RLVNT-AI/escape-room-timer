import { RefObject, useRef } from 'react';

interface PuzzleCardProps {
  index: number;
  inputs: [string, string];
  isDone: boolean;
  finished: boolean;
  running: boolean;
  onInputChange: (inputIdx: number, val: string) => void;
  externalInput0Ref?: RefObject<HTMLInputElement | null> | null;
  externalInput1Ref?: RefObject<HTMLInputElement | null> | null;
}

export default function PuzzleCard({ 
  index, 
  inputs,
  isDone,
  finished, 
  running, 
  onInputChange,
  externalInput0Ref,
  externalInput1Ref 
}: PuzzleCardProps) {

  // ═══════════════════════════════════════════════════════════
  // REFS: Local refs for intra pair navigation
  // ═══════════════════════════════════════════════════════════
  const localInput0Ref = useRef<HTMLInputElement>(null);
  const localInput1Ref = useRef<HTMLInputElement>(null);
  
  // Merge: Pair 0 uses external refs, others use local
  const input0Ref = externalInput0Ref || localInput0Ref;
  const input1Ref = externalInput1Ref || localInput1Ref;

  // ═══════════════════════════════════════════════════════════
  // KEYBOARD NAVIGATION: Backspace to empty input 1 -> back to input 0
  // ═══════════════════════════════════════════════════════════
  const handleKeyDown = (inputIdx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputIdx === 1 && inputs[1] === '') {
      e.preventDefault();
      input0Ref.current?.focus();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // INPUT HANDLING: Auto jump to input 1 if input 0 filled
  // ═══════════════════════════════════════════════════════════

  const handleChange = (idx: number, newValue: string) => {
    const trimmed = newValue.slice(-1);
    onInputChange(idx, trimmed);
    
    if (idx === 0 && trimmed !== '') {
      input1Ref?.current?.focus();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // STYLING: Green only when COMPLETELY finished, otherwise normal
  // ═══════════════════════════════════════════════════════════
  const cardStyle = isDone
    ? "border-emerald-500/40 bg-emerald-500/10" 
    : running
    ? "border-white/30 bg-white/5"               
    : "border-white/10 bg-white/5 opacity-40";   

  // ═══════════════════════════════════════════════════════════
  // DISABLED STATE: Only locked when not running or finished
  // ═══════════════════════════════════════════════════════════
  const isDisabled = isDone || !running || finished;


  return (
    <div
      className={`relative rounded-2xl border p-5 h-40 flex flex-col items-center justify-center ${cardStyle}`}
    >
      {/* Pair Label */}
      <div className="absolute top-3 left-5 text-xs uppercase tracking-wider text-white/60">
        Paar {index + 1}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* INPUTS: Always editable (unless disabled), password mode */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-3">
        {[0, 1].map((i) => (
          <input
            key={i}
            ref={i === 0 ? input0Ref : input1Ref}
            type={finished ? "text" : "password"}  // ← Password until completely finished!
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/60 border transition-all duration-300 text-center text-2xl sm:text-3xl font-semibold outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDone 
                ? 'border-emerald-500/40 text-emerald-400 focus:ring-emerald-500/30' 
                : 'border-white/20 focus:ring-white/30'
            }`}            value={inputs[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            disabled={isDisabled}
            inputMode="text"
            autoCapitalize="characters"
            aria-label={`Buchstabe ${i + 1} von Paar ${index + 1}`}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATUS INDICATORS */}
      {/* ═══════════════════════════════════════════════════════ */}
      {isDone && (
        <div className="absolute bottom-3 text-xs text-emerald-400/80 font-medium">
          ✓ Richtig
        </div>
      )}
      
      {!isDone && !running && !finished && (
        <div className="absolute bottom-3 text-xs text-white/50">
          Deaktiviert
        </div>
      )}
    </div>
  );
}
