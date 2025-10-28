import { RefObject } from 'react';
import PuzzleCard from './PuzzleCard';
import { TARGET_PAIRS } from '../constants';

interface PuzzleGridProps {
  activePair: number;
  inputs: [string, string];
  finished: boolean;
  running: boolean;
  onInputChange: (idx: number, val: string) => void;
  input0Ref: RefObject<HTMLInputElement | null>;
  input1Ref: RefObject<HTMLInputElement | null>;
}

export default function PuzzleGrid({ 
  activePair, 
  inputs, 
  finished, 
  running,
  onInputChange,
  input0Ref,
  input1Ref 
}: PuzzleGridProps) {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {TARGET_PAIRS.map((pair, idx) => {
        const isDone = finished ? idx <= activePair : idx < activePair;
        const isActive = idx === activePair && !finished && running;
        
        return (
          <PuzzleCard
            key={idx}
            pair={pair}
            index={idx}
            isDone={isDone}
            isActive={isActive}
            inputs={inputs}
            onInputChange={onInputChange}
            input0Ref={isActive ? input0Ref : null}
            input1Ref={isActive ? input1Ref : null}
          />
        );
      })}
    </div>
  );
}
