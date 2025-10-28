import { formatHMS } from '../utils/formatters';
import { TIME_PENALTY } from '../constants';

interface TimerDisplayProps {
  timeLeft: number;
  penalty: boolean;
}

export default function TimerDisplay({ timeLeft, penalty }: TimerDisplayProps) {
  return (
    <div className="text-center mb-12">
      <div
        className={`
          text-8xl md:text-9xl font-bold font-mono tracking-wider
          transition-all duration-300
          ${penalty ? 'text-red-500 scale-110' : 'text-white'}
        `}
      >
        {formatHMS(timeLeft)}
      </div>
      
      <div className="h-8 mt-4 flex items-center justify-center">
        <div
          className={`
            text-red-500 text-xl font-semibold
            transition-opacity duration-300
            ${penalty ? 'opacity-100 animate-pulse' : 'opacity-0'}
          `}
        >
          -{TIME_PENALTY} Sekunden Strafe!
        </div>
      </div>
    </div>
  );
}


