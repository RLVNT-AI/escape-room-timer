import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { TARGET_PAIRS, FLASH_DURATION, TIME_PENALTY, WIN_SOUND_DELAY } from '../constants';
import { UseAudioReturn } from './useAudio';

type FlashState = "" | "success" | "error";

interface UsePuzzleReturn {
  activePair: number;
  inputs: [string, string];
  flash: FlashState;
  finished: boolean;
  penalty: boolean;
  input0Ref: RefObject<HTMLInputElement>;
  input1Ref: RefObject<HTMLInputElement>;
  handleInput: (idx: number, val: string) => void;
  focusActiveInput: () => void;
  check: () => void;
  canCheck: boolean;
  reset: () => void;
}

export function usePuzzle(
  audioRefs: UseAudioReturn,
  setTimeLeft: (value: number | ((prev: number) => number)) => void
): UsePuzzleReturn {
  const [activePair, setActivePair] = useState<number>(0);
  const [inputs, setInputs] = useState<[string, string]>(["", ""]);
  const [flash, setFlash] = useState<FlashState>("");
  const [penalty, setPenalty] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const input0Ref = useRef<HTMLInputElement>(null);
  const input1Ref = useRef<HTMLInputElement>(null);

  // Flash reset
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(""), FLASH_DURATION);
    return () => clearTimeout(t);
  }, [flash]);

  // Penalty animation reset
  useEffect(() => {
    if (!penalty) return;
    const t = setTimeout(() => setPenalty(false), 1000);
    return () => clearTimeout(t);
  }, [penalty]);

  const handleInput = (idx: number, val: string): void => {
    const v = (val || "").slice(-1).toUpperCase().replace(/[^A-Z]/g, "");
    setInputs((old) => {
      const next: [string, string] = [...old] as [string, string];
      next[idx] = v;
      return next;
    });
  };

  const focusActiveInput = useCallback(() => {
    if (finished) return;
    
    setTimeout(() => {
      const val0 = input0Ref.current?.value || '';
      const val1 = input1Ref.current?.value || '';
      
      if (val0 === '') {
        input0Ref.current?.focus();
      } 
      else if (val1 === '') {
        input1Ref.current?.focus();
      }
      else {
        input1Ref.current?.focus();
      }
    }, 0);
  }, [finished]);


  const check = (): void => {
    if (finished) return;
    
    const [a, b] = inputs.map((x) => x.trim().toUpperCase());
    const [ta, tb] = TARGET_PAIRS[activePair];
    const correct = a === ta && b === tb;

    if (correct) {
      setFlash("success");
      audioRefs.playSound(audioRefs.okRef);

      if (activePair === TARGET_PAIRS.length - 1) {
        setFinished(true);
        setTimeout(() => audioRefs.playSound(audioRefs.winRef), WIN_SOUND_DELAY);
      } else {
        setActivePair((p) => p + 1);
        setInputs(["", ""]);
        setTimeout(() => focusActiveInput(), 100);
      }
    } else {
      setFlash("error");
      setPenalty(true);
      audioRefs.playSound(audioRefs.errRef);
      setTimeLeft((t) => Math.max(0, t - TIME_PENALTY));
      setInputs(["", ""]);
      setTimeout(() => focusActiveInput(), 100);
    }
  };

  const reset = (): void => {
    setFinished(false);
    setActivePair(0);
    setInputs(["", ""]);
    setFlash("");
    setPenalty(false);
  };

  const canCheck = inputs[0].length === 1 && inputs[1].length === 1 && !finished;

  return {
    activePair,
    inputs,
    flash,
    finished,
    penalty,
    input0Ref,
    input1Ref,
    handleInput,
    focusActiveInput,
    check,
    canCheck,
    reset
  };
}
