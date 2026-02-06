import { useState } from 'react';
import { X } from 'lucide-react';

interface MoodModalProps {
  mood: {
    emoji: string;
    label: string;
    color: string;
  } | null;
  onClose: () => void;
  onSave: (note: string) => void;
}

export function MoodModal({ mood, onClose, onSave }: MoodModalProps) {
  const [note, setNote] = useState('');

  if (!mood) return null;

  const handleSave = () => {
    onSave(note);
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-500"
        style={{ 
          background: `linear-gradient(180deg, ${mood.color}15 0%, white 40%)`
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-800">Tambahkan catatan hari ini?</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg animate-in zoom-in duration-500"
            style={{ 
              background: `linear-gradient(135deg, ${mood.color}40, ${mood.color}20)`,
              boxShadow: `0 8px 24px ${mood.color}30`
            }}
          >
            <span className="text-6xl">{mood.emoji}</span>
          </div>
          <p className="text-gray-600">{mood.label}</p>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tulis catatanmu di sini…"
          className="w-full h-32 p-4 border-2 border-gray-100 rounded-3xl resize-none focus:outline-none focus:border-purple-200 transition-colors mb-6 text-gray-700 placeholder:text-gray-400"
          style={{ fontFamily: 'inherit' }}
        />

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${mood.color}dd, ${mood.color}aa)`
          }}
        >
          Simpan Mood
        </button>
      </div>
    </div>
  );
}