import { RefObject } from 'react';

export function formatHMS(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600).toString().padStart(2, "0");
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export function playSound(ref: RefObject<HTMLAudioElement | null>): void {
  if (!ref.current) return;
  ref.current.currentTime = 0;
  ref.current.play().catch(() => {});
}
