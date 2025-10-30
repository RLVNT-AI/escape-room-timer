import { useState, useRef, useEffect } from 'react';

interface PasswordModalProps {
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

export default function PasswordModal({ onSubmit, onCancel }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
      setPassword('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">🔒 Settings</h2>
        <p className="text-gray-400 text-sm mb-6">Passwort eingeben um fortzufahren</p>
        
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Passwort"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 mb-4"
          />
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all"
            >
              Bestätigen
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all"
            >
              Abbrechen
            </button>
          </div>
        </form>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          ESC = Cancel
        </p>
      </div>
    </div>
  );
}
