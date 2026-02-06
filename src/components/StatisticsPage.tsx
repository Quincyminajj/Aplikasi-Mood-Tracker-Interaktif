import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Smile } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: {
    emoji: string;
    label: string;
    color: string;
    id: string;
  };
  note: string;
}

interface StatisticsPageProps {
  entries: MoodEntry[];
}

export function StatisticsPage({ entries }: StatisticsPageProps) {
  // Get last 7 days entries
  const last7Days = entries.slice(-7);

  // Mood value mapping for trend
  const moodValues: { [key: string]: number } = {
    'happy': 5,
    'calm': 4,
    'tired': 3,
    'anxious': 2,
    'sad': 2,
    'angry': 1
  };

  // Prepare line chart data
  const lineChartData = last7Days.map((entry, index) => ({
    name: new Date(entry.date).toLocaleDateString('id-ID', { weekday: 'short' }),
    value: moodValues[entry.mood.id] || 3,
    date: entry.date
  }));

  // Count mood frequency
  const moodCounts: { [key: string]: { count: number; emoji: string; color: string; label: string } } = {};
  entries.forEach(entry => {
    const moodId = entry.mood.id;
    if (!moodCounts[moodId]) {
      moodCounts[moodId] = {
        count: 0,
        emoji: entry.mood.emoji,
        color: entry.mood.color,
        label: entry.mood.label
      };
    }
    moodCounts[moodId].count++;
  });

  // Prepare pie chart data
  const pieChartData = Object.entries(moodCounts).map(([id, data]) => ({
    name: data.label,
    value: data.count,
    emoji: data.emoji,
    color: data.color
  }));

  // Find most frequent mood
  const mostFrequentMood = pieChartData.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  , pieChartData[0]);

  // Calculate average mood score
  const avgScore = entries.length > 0 
    ? (entries.reduce((sum, entry) => sum + (moodValues[entry.mood.id] || 3), 0) / entries.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <h1 className="text-gray-800 mb-8 text-center">Statistik Mood</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Smile size={20} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1">Mood Terfavorit</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mostFrequentMood?.emoji}</span>
            <h3 className="text-gray-800">{mostFrequentMood?.name}</h3>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1">Rata-rata Mood</p>
          <h2 className="text-gray-800">{avgScore}/5.0</h2>
        </div>
      </div>

      {/* Line Chart - 7 Days Trend */}
      {lineChartData.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h3 className="text-gray-800 mb-4">Tren Mood 7 Hari Terakhir</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#999" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#999" 
                style={{ fontSize: '12px' }}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#A78BFA" 
                strokeWidth={3}
                dot={{ fill: '#A78BFA', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pie Chart - Mood Distribution */}
      {pieChartData.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h3 className="text-gray-800 mb-4">Distribusi Mood</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} opacity={0.7} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {pieChartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color, opacity: 0.7 }}
                />
                <span className="text-xs text-gray-600">
                  {entry.emoji} {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-center">
          <p className="text-gray-500">Belum ada data mood untuk ditampilkan. Mulai catat mood harimu! 📊</p>
        </div>
      )}
    </div>
  );
}
