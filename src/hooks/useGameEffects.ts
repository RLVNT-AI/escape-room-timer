import { useEffect } from 'react';
import { UseTimerReturn } from './useTimer';
import { UseAudioReturn } from './useAudio';

interface UsePuzzleForEffects {
  finished: boolean;
  canCheck: boolean;
  check: () => void;
  focusActiveInput: () => void;
}

interface UseGameEffectsProps {
  timer: UseTimerReturn;
  audio: UseAudioReturn;
  puzzle: UsePuzzleForEffects;
}

export function useGameEffects({ timer, audio, puzzle }: UseGameEffectsProps) {
  // Background music control
  useEffect(() => {
    const el = audio.musicRef.current;
    if (!el) return;
    
    el.loop = true;
    if (timer.running && !puzzle.finished) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
    
    return () => {
      el.pause();
      el.currentTime = 0;
    };
  }, [timer.running, puzzle.finished, audio.musicRef]);

  // Timer stoppen wenn Puzzle gelöst
  useEffect(() => {
    if (puzzle.finished) {
      timer.setRunning(false);
    }
  }, [puzzle.finished, timer]);

  // Auto-Focus bei Start/Resume
  useEffect(() => {
    if (timer.running && !puzzle.finished) {
      setTimeout(() => {
        puzzle.focusActiveInput();
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.running, puzzle.finished]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && puzzle.canCheck && timer.running) {
        e.preventDefault();
        puzzle.check();
      }
      if (e.key === " " && !puzzle.finished) {
        e.preventDefault();
        timer.setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [puzzle, timer]);
}
