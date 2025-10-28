import { useRef, RefObject } from 'react';
import { playSound } from '../utils/formatters';

export interface UseAudioReturn {
  musicRef: RefObject<HTMLAudioElement>;
  okRef: RefObject<HTMLAudioElement>;
  errRef: RefObject<HTMLAudioElement>;
  winRef: RefObject<HTMLAudioElement>;
  playSound: (ref: RefObject<HTMLAudioElement>) => void;
}

export function useAudio(): UseAudioReturn {
  const musicRef = useRef<HTMLAudioElement>(null);
  const okRef = useRef<HTMLAudioElement>(null);
  const errRef = useRef<HTMLAudioElement>(null);
  const winRef = useRef<HTMLAudioElement>(null);

  return {
    musicRef,
    okRef,
    errRef,
    winRef,
    playSound: (ref) => playSound(ref)
  };
}
