import { RefObject } from 'react';
import PuzzleCard from './PuzzleCard';

interface PuzzleGridProps {
  pairInputs: Array<[string, string]>;
  pairsDone: boolean[];
  finished: boolean;
  running: boolean;
  onInputChange: (pairIdx: number, inputIdx: number, val: string) => void;
  input0Ref: RefObject<HTMLInputElement | null>;
  input1Ref: RefObject<HTMLInputElement | null>;
}

export default function PuzzleGrid({ 
  pairInputs,
  pairsDone,
  finished, 
  running,
  onInputChange,
  input0Ref,
  input1Ref 
}: PuzzleGridProps) {

  const colsMap: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};

  return (
    <div className={`mt-10 grid grid-cols-1 gap-6 ${colsMap[pairInputs.length] ?? 'sm:grid-cols-4'}`}>
      {pairInputs.map((pairInput, idx) => {
        // ═══════════════════════════════════════════════════════════
        // Only Pair 0 gets external refs for reset focus
        // ═══════════════════════════════════════════════════════════
        const isFirstPair = idx === 0;
        
        return (
          <PuzzleCard
            key={idx}
            index={idx}
            inputs={pairInput}
            isDone={pairsDone[idx]}
            finished={finished}
            running={running}
            onInputChange={(inputIdx, val) => onInputChange(idx, inputIdx, val)}
            externalInput0Ref={isFirstPair ? input0Ref : null}
            externalInput1Ref={isFirstPair ? input1Ref : null}
          />
        );
      })}
    </div>
  );
}
