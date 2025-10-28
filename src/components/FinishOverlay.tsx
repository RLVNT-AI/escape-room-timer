import { formatHMS } from '../utils/formatters';

interface FinishOverlayProps {
  timeLeft: number;
  onPlayAgain: () => void;
}

export default function FinishOverlay({ timeLeft, onPlayAgain }: FinishOverlayProps) {
  return (
    <>
      {/* Backdrop - dunkler Hintergrund */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
      
      {/* Overlay Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform animate-bounce-in">
          {/* Emoji */}
          <div className="text-6xl mb-4">🎉</div>
          
          {/* Titel */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Geschafft!
          </h2>
          
          {/* Untertitel */}
          <p className="text-white/90 mb-6">
            Alle Rätsel gelöst!
          </p>
          
          {/* Zeit */}
          <div className="bg-white/20 rounded-lg p-4 mb-6">
            <div className="text-sm text-white/80 mb-1">Verbleibende Zeit</div>
            <div className="text-3xl font-mono font-bold text-white">
              {formatHMS(timeLeft)}
            </div>
          </div>
          
          {/* Nochmal Button */}
          <button
            onClick={onPlayAgain}
            className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Play again
          </button>
        </div>
      </div>
    </>
  );
}
