import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { FLASH_DURATION, TIME_PENALTY, WIN_SOUND_DELAY } from '../defaults';
import { UseAudioReturn } from './useAudio';

type FlashState = "" | "success" | "error";

interface UsePuzzleReturn {
  pairInputs: Array<[string, string]>;
  pairsDone: boolean[];
  flash: FlashState;
  finished: boolean;
  penalty: boolean;
  input0Ref: RefObject<HTMLInputElement | null>;
  input1Ref: RefObject<HTMLInputElement | null>;
  handleInput: (pairIdx: number, inputIdx: number, val: string) => void;  
  focusFirstInput: () => void;
  check: () => void;
  canCheck: boolean;
  reset: () => void;
  clearInputs: () => void;
  continueGame: () => void;
}

export function usePuzzle(
  audioRefs: UseAudioReturn,
  setTimeLeft: (value: number | ((prev: number) => number)) => void,
  targetPairs: Array<[string, string]>  
): UsePuzzleReturn {

  const [pairInputs, setPairInputs] = useState<Array<[string, string]>>(
    Array(targetPairs.length).fill(null).map(() => ['', ''])
  );
  const [pairsDone, setPairsDone] = useState<boolean[]>(
    Array(targetPairs.length).fill(false)
  );
  const [flash, setFlash] = useState<FlashState>("");
  const [penalty, setPenalty] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const input0Ref = useRef<HTMLInputElement>(null);
  const input1Ref = useRef<HTMLInputElement>(null);

  // ═══════════════════════════════════════════════════════════
  // EFFECTS: Flash & Penalty Animation Reset
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(""), FLASH_DURATION);
    return () => clearTimeout(t);
  }, [flash]);

  useEffect(() => {
    if (!penalty) return;
    const t = setTimeout(() => setPenalty(false), 1000);
    return () => clearTimeout(t);
  }, [penalty]);


  // ═══════════════════════════════════════════════════════════
  // INPUT HANDLING: Update specific pair + input
  // ═══════════════════════════════════════════════════════════
  const handleInput = (pairIdx: number, inputIdx: number, val: string): void => {
    if (finished) return;
    
    const v = (val || "").slice(-1).toUpperCase().replace(/[^A-Z]/g, "");
    
    setPairInputs((prev) => {
      const updated = prev.map((pair, i) => 
        i === pairIdx 
          ? pair.map((char, j) => j === inputIdx ? v : char) as [string, string]
          : pair
      );
      return updated;
    });
  };

  // ═══════════════════════════════════════════════════════════
  // FOCUS: Jump to first input after reset
  // ═══════════════════════════════════════════════════════════
  const focusFirstInput = useCallback(() => {
    if (finished) return;
    setTimeout(() => {
      input0Ref.current?.focus();
    }, 100);
  }, [finished]);

  // ═══════════════════════════════════════════════════════════
  // CHECK: Only win or lose when all are correct, no inbetween
  // ═══════════════════════════════════════════════════════════
  const check = (): void => {
    if (finished) return;

    // Prüfe, ob jede Eingabe mit der Lösung übereinstimmt
    const isWin = targetPairs.every((targetPair, idx) => {
      const [userA, userB] = pairInputs[idx].map(x => x.trim().toUpperCase());
      const [targetA, targetB] = targetPair;
      return userA === targetA && userB === targetB;
    });

    // Fall 1: Alles richtig -> GEWONNEN
    if (isWin) {
      setPairsDone(Array(targetPairs.length).fill(true)); 
      setFlash("success");
      setFinished(true);
      audioRefs.playSound(audioRefs.okRef);
      setTimeout(() => audioRefs.playSound(audioRefs.winRef), WIN_SOUND_DELAY);
    
    // Fall 2: Nicht alles richtig -> FEHLER
    } else {
      setFlash("error");
      setPenalty(true);
      audioRefs.playSound(audioRefs.errRef);
      setTimeLeft((t) => Math.max(0, t - TIME_PENALTY));
      setPairInputs(Array(targetPairs.length).fill(null).map(() => ['', '']));
      setPairsDone(Array(targetPairs.length).fill(false));
      focusFirstInput();
    }
  };

 /*
  // ═══════════════════════════════════════════════════════════
  // OLD CHECK: Partial correctness is allowed
  // ═══════════════════════════════════════════════════════════
 const check = (): void => {
    if (finished) return;
    
    targetPairs.forEach((targetPair, idx) => {
      const [userA, userB] = pairInputs[idx].map(x => x.trim().toUpperCase());
      const [targetA, targetB] = targetPair;
      
      // Only check pairs that have BOTH inputs filled AND are not done yet
      if (userA && userB && !pairsDone[idx]) {
        if (userA === targetA && userB === targetB) {
          newDone[idx] = true;
        } else {
          hasError = true;
        }
      }
    });
    
    if (hasError) {
      setFlash("error");
      setPenalty(true);
      audioRefs.playSound(audioRefs.errRef);
      setTimeLeft((t) => Math.max(0, t - TIME_PENALTY));
      setPairInputs(Array(targetPairs.length).fill(null).map(() => ['', '']));
      setPairsDone(Array(targetPairs.length).fill(false));
      focusFirstInput();
    } else if (newDone.every(x => x)) {
      setPairsDone(newDone);
      setFlash("success");
      setFinished(true);
      audioRefs.playSound(audioRefs.okRef);
      setTimeout(() => audioRefs.playSound(audioRefs.winRef), WIN_SOUND_DELAY);
    } else {
      setPairsDone(newDone);
      if (newDone.some((done, idx) => done && !pairsDone[idx])) {
        audioRefs.playSound(audioRefs.okRef);
      }
    }
  };
  */

  // ═══════════════════════════════════════════════════════════
  // NEU: CLEAR INPUTS - Leert alle Eingabefelder
  // ═══════════════════════════════════════════════════════════
  const clearInputs = (): void => {
    if (finished) return;
    setPairInputs(Array(targetPairs.length).fill(null).map(() => ['', '']));
    focusFirstInput();
  };

  const continueGame = (): void => {
    setFinished(false);
    setPairsDone(Array(targetPairs.length).fill(false));
    setPairInputs(Array(targetPairs.length).fill(null).map(() => ['', '']));
    focusFirstInput();
  };

  // ═══════════════════════════════════════════════════════════
  // RESET: Reset entire game (except for timer)
  // ═══════════════════════════════════════════════════════════
  const reset = (): void => {
    setFinished(false);
    setPairInputs(Array(targetPairs.length).fill(null).map(() => ['', '']));
    setPairsDone(Array(targetPairs.length).fill(false));
    setFlash("");
    setPenalty(false);
  };

  // ═══════════════════════════════════════════════════════════
  // CAN CHECK: Enter at least one letter
  // ═══════════════════════════════════════════════════════════
  const canCheck = !finished && pairInputs.every(pair => 
    (pair[0].length > 0 && pair[1].length > 0)
  );

  return {
    pairInputs,
    pairsDone,
    flash,
    finished,
    penalty,
    input0Ref,
    input1Ref,
    handleInput,
    focusFirstInput,
    check,
    canCheck,
    reset,
    clearInputs,
    continueGame
  };
}
