interface Mood {
  emoji: string;
  label: string;
  color: string;
  id: string;
}

interface HomePageProps {
  onMoodSelect: (mood: Mood) => void;
  currentDate: string;
}

export function HomePage({ onMoodSelect, currentDate }: HomePageProps) {
  const moods: Mood[] = [
    { id: 'happy', emoji: '😄', label: 'Senang', color: '#FFD93D' },
    { id: 'calm', emoji: '🙂', label: 'Tenang', color: '#6BCB77' },
    { id: 'sad', emoji: '😢', label: 'Sedih', color: '#6A9BD8' },
    { id: 'angry', emoji: '😠', label: 'Marah', color: '#FF6B6B' },
    { id: 'anxious', emoji: '😰', label: 'Cemas', color: '#BA68C8' },
    { id: 'tired', emoji: '😴', label: 'Lelah', color: '#95A5A6' },
  ];

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="mb-8">
        <h1 className="text-gray-800 mb-3 text-center">
          Bagaimana perasaanmu hari ini?
        </h1>
        <p className="text-center text-gray-500">
          Hari ini • {currentDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood, index) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className="group relative overflow-hidden rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${mood.color}20, ${mood.color}05)`,
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${mood.color}30, ${mood.color}15)`,
                  boxShadow: `0 4px 16px ${mood.color}25`
                }}
              >
                <span className="text-5xl">{mood.emoji}</span>
              </div>
              <span className="text-gray-700">{mood.label}</span>
            </div>
            
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(circle at center, ${mood.color}15, transparent 70%)`
              }}
            />
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
        <p className="text-center text-gray-600 text-sm">
          💜 Pilih mood yang paling menggambarkan perasaanmu saat ini
        </p>
      </div>
    </div>
  );
}
