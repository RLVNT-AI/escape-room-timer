import { formatHMS } from '../utils/formatters';

interface FinishOverlayProps {
  timeLeft: number;
  targetPairs: Array<[string, string]>;
  onPlayAgain: () => void;
  onContinue: () => void;
}

export default function FinishOverlay({ timeLeft, targetPairs, onPlayAgain, onContinue }: FinishOverlayProps) {
  return (
    <>
      {/* Backdrop - dunkler Hintergrund */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      
      {/* Overlay Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform animate-bounce-in">
          {/* Emoji */}
          <div className="text-6xl mb-4">🎉</div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Geschafft!
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/90 mb-6">
            Alle Rätsel gelöst!
          </p>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SOLVED PAIRS: Show the target solution */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-6 flex gap-3 justify-center flex-wrap">
          {targetPairs.map(([a, b], i) => (
            <div key={i} className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
              <span className="text-emerald-100 font-mono text-xl font-semibold">{a}</span>
              <span className="text-emerald-20/50">•</span>
              <span className="text-emerald-100 font-mono text-xl font-semibold">{b}</span>
            </div>
          ))}
        </div>
          
          {/* Remaining Time */}
          <div className="bg-white/20 rounded-lg p-4 mb-6">
            <div className="text-sm text-white/80 mb-1">Verbleibende Zeit</div>
            <div className="text-3xl font-mono font-bold text-white">
              {formatHMS(timeLeft)}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={onContinue}
              className="w-full bg-white/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/30 transition-all"
            >
              Weiterspielen
            </button>
            
            <button
              onClick={onPlayAgain}
              className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Nochmal spielen
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
