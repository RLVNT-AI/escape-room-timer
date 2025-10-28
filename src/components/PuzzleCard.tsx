import { RefObject } from 'react';

interface PuzzleCardProps {
  pair: [string, string];
  index: number;
  isDone: boolean;
  isActive: boolean;
  inputs: [string, string];
  onInputChange: (idx: number, val: string) => void;
  input0Ref: RefObject<HTMLInputElement> | null;
  input1Ref: RefObject<HTMLInputElement> | null;
}

export default function PuzzleCard({ 
  pair, 
  index, 
  isDone, 
  isActive, 
  inputs, 
  onInputChange,
  input0Ref,
  input1Ref 
}: PuzzleCardProps) {

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && idx === 1 && inputs[1] === '') {
      e.preventDefault();
      input0Ref?.current?.focus();
    }
  };

  const handleChange = (idx: number, newValue: string) => {
    const trimmed = newValue.slice(-1);
    onInputChange(idx, trimmed);
    
    if (idx === 0 && trimmed !== '') {
      input1Ref?.current?.focus();
    }
  };

  return (
    <div
      className={
        "relative rounded-2xl border p-5 h-40 flex flex-col items-center justify-center " +
        (isActive
          ? "border-white/30 bg-white/5"
          : isDone
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-white/10 bg-white/5 opacity-40")
      }
    >
      <div className="absolute top-3 left-5 text-xs uppercase tracking-wider text-white/60">
        Pair {index + 1}
      </div>

      {isDone ? (
        <div className="flex items-center gap-3">
          {pair.map((c) => (
            <div
              key={c}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl font-semibold"
            >
              {c}
            </div>
          ))}
        </div>
      ) : isActive ? (
        <div className="flex items-center gap-3">
          {[0, 1].map((i) => (
            <input
              key={i}
              ref={i === 0 ? input0Ref : input1Ref}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/60 border border-white/20 text-center text-2xl sm:text-3xl font-semibold outline-none focus:ring-2 focus:ring-white/30"
              value={inputs[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              disabled={!isActive}
              inputMode="text"
              autoCapitalize="characters"
              aria-label={`Buchstabe ${i + 1} von Paar ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs text-white/50 mt-4">Locked</div>
      )}
    </div>
  );
}
