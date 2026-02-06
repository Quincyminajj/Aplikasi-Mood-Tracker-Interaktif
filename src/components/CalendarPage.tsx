import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: {
    emoji: string;
    label: string;
    color: string;
  };
  note: string;
}

interface CalendarPageProps {
  entries: MoodEntry[];
  onDateClick: (date: string) => void;
}

export function CalendarPage({ entries, onDateClick }: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getMoodForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.find(entry => entry.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <h1 className="text-gray-800 mb-8 text-center">Kalender Mood</h1>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="w-10 h-10 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} className="text-purple-600" />
          </button>
          <h2 className="text-gray-800">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} className="text-purple-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (typeof day !== 'number') {
              return day;
            }

            const moodEntry = getMoodForDate(day);
            const today = isToday(day);

            return (
              <button
                key={`day-${day}`}
                onClick={() => moodEntry && onDateClick(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                  moodEntry 
                    ? 'hover:scale-110 cursor-pointer shadow-sm hover:shadow-md' 
                    : 'bg-gray-50'
                } ${today ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}
                style={moodEntry ? {
                  background: `linear-gradient(135deg, ${moodEntry.mood.color}25, ${moodEntry.mood.color}10)`
                } : {}}
              >
                <span className={`text-xs mb-1 ${moodEntry ? 'text-gray-700' : 'text-gray-400'}`}>
                  {day}
                </span>
                {moodEntry && (
                  <span className="text-2xl">{moodEntry.mood.emoji}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
        <p className="text-center text-gray-600 text-sm">
          📅 Ketuk tanggal untuk melihat detail mood hari tersebut
        </p>
      </div>
    </div>
  );
}
