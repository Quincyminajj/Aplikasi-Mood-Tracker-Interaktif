import { X, Edit3 } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: {
    emoji: string;
    label: string;
    color: string;
  };
  note: string;
}

interface MoodDetailModalProps {
  entry: MoodEntry | null;
  onClose: () => void;
  onEdit: () => void;
}

export function MoodDetailModal({ entry, onClose, onEdit }: MoodDetailModalProps) {
  if (!entry) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300 p-6">
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-300"
        style={{ 
          background: `linear-gradient(180deg, ${entry.mood.color}10 0%, white 30%)`
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-800">Detail Mood</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-28 h-28 rounded-full flex items-center justify-center mb-4 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${entry.mood.color}40, ${entry.mood.color}20)`,
              boxShadow: `0 8px 24px ${entry.mood.color}30`
            }}
          >
            <span className="text-7xl">{entry.mood.emoji}</span>
          </div>
          <h2 className="text-gray-800 mb-2">{entry.mood.label}</h2>
          <p className="text-gray-500 text-sm">{formatDate(entry.date)}</p>
        </div>

        {entry.note && (
          <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
            <p className="text-gray-700 text-sm">{entry.note}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <Edit3 size={18} />
            <span>Edit Mood</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
