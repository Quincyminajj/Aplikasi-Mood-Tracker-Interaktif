import { Heart, Wind, Coffee, Moon, Music, BookOpen } from 'lucide-react';

interface Suggestion {
  mood: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  tips: string[];
}

export function SuggestionsPage() {
  const suggestions: Suggestion[] = [
    {
      mood: 'sedih',
      title: 'Coba Istirahat Sejenak',
      description: 'Ketika merasa sedih, beri waktu untuk dirimu sendiri',
      icon: Heart,
      color: '#6A9BD8',
      tips: [
        'Dengarkan musik favoritmu',
        'Berbicara dengan teman dekat',
        'Tulis perasaanmu di jurnal',
        'Lakukan aktivitas yang kamu sukai'
      ]
    },
    {
      mood: 'cemas',
      title: 'Latihan Pernapasan',
      description: 'Teknik pernapasan dapat membantu menenangkan pikiran',
      icon: Wind,
      color: '#BA68C8',
      tips: [
        'Tarik napas dalam selama 4 detik',
        'Tahan napas selama 4 detik',
        'Hembuskan perlahan selama 4 detik',
        'Ulangi 5-10 kali'
      ]
    },
    {
      mood: 'marah',
      title: 'Ambil Jeda Sebentar',
      description: 'Beri waktu untuk menenangkan diri sebelum bereaksi',
      icon: Coffee,
      color: '#FF6B6B',
      tips: [
        'Hitung sampai 10 sebelum berbicara',
        'Tinggalkan situasi sejenak',
        'Minum air atau teh hangat',
        'Lakukan peregangan ringan'
      ]
    },
    {
      mood: 'lelah',
      title: 'Waktunya Istirahat',
      description: 'Tubuh dan pikiranmu butuh recharge',
      icon: Moon,
      color: '#95A5A6',
      tips: [
        'Tidur siang 15-20 menit',
        'Matikan notifikasi sejenak',
        'Lakukan power nap',
        'Tutup mata dan relaksasi'
      ]
    },
    {
      mood: 'senang',
      title: 'Bagikan Kebahagiaanmu',
      description: 'Kebahagiaan akan bertambah ketika dibagikan',
      icon: Music,
      color: '#FFD93D',
      tips: [
        'Hubungi orang yang kamu sayangi',
        'Lakukan hobi favoritmu',
        'Catat momen bahagia ini',
        'Bagikan senyuman pada sekitar'
      ]
    },
    {
      mood: 'tenang',
      title: 'Jaga Kedamaianmu',
      description: 'Manfaatkan momen tenang untuk refleksi',
      icon: BookOpen,
      color: '#6BCB77',
      tips: [
        'Baca buku yang menginspirasi',
        'Meditasi ringan 10 menit',
        'Nikmati secangkir teh',
        'Tulis rencana dan tujuan'
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <h1 className="text-gray-800 mb-3 text-center">Saran Untukmu</h1>
      <p className="text-center text-gray-500 mb-8">
        Tips dan aktivitas untuk setiap mood
      </p>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={index}
              className="rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${suggestion.color}15, ${suggestion.color}05)`
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${suggestion.color}40, ${suggestion.color}20)`
                  }}
                >
                  <Icon size={26} style={{ color: suggestion.color }} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-800">{suggestion.title}</h3>
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{
                        background: `${suggestion.color}20`,
                        color: suggestion.color
                      }}
                    >
                      {suggestion.mood}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {suggestion.tips.map((tip, tipIndex) => (
                  <div
                    key={tipIndex}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/60"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{
                        background: `${suggestion.color}25`,
                        color: suggestion.color
                      }}
                    >
                      {tipIndex + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
        <p className="text-center text-gray-600 text-sm">
          💡 Ingat, setiap perasaan adalah valid. Dengarkan dirimu sendiri dan lakukan yang terbaik untukmu.
        </p>
      </div>
      <div className="mt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} by pyrexfeel aka abdansyakuran
      </div>
    </div>
  );
}
