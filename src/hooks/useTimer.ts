import { useState, useEffect } from 'react';

export interface UseTimerReturn {
  timeLeft: number;
  running: boolean;
  hasStarted: boolean;
  setRunning: (value: boolean | ((prev: boolean) => boolean)) => void;
  setTimeLeft: (value: number | ((prev: number) => number)) => void;
  reset: () => void;
}

export function useTimer(initialTime: number): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [running, setRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (running) {
      setHasStarted(true);
    }
  }, [running]);

  // Countdown
  useEffect(() => {
    if (!running) return;
    
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(id);
  }, [running]);

  // Auto-stop at 0
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
    }
  }, [timeLeft]);

  const reset = (): void => {
    setTimeLeft(initialTime);
    setRunning(false);
    setHasStarted(false);
  };

  return { 
    timeLeft, 
    running, 
    hasStarted,
    setRunning, 
    setTimeLeft,
    reset 
  };
}
