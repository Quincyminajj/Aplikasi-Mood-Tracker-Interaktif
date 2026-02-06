import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { CalendarPage } from './components/CalendarPage';
import { StatisticsPage } from './components/StatisticsPage';
import { SuggestionsPage } from './components/SuggestionsPage';
import { MoodModal } from './components/MoodModal';
import { MoodDetailModal } from './components/MoodDetailModal';
import { BottomNav } from './components/BottomNav';

interface Mood {
  emoji: string;
  label: string;
  color: string;
  id: string;
}

interface MoodEntry {
  date: string;
  mood: Mood;
  note: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'stats' | 'suggestions'>('home');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodly-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Add some sample data for demonstration
      const sampleData: MoodEntry[] = [
        {
          date: '2024-11-25',
          mood: { id: 'happy', emoji: '😄', label: 'Senang', color: '#FFD93D' },
          note: 'Hari yang menyenangkan!'
        },
        {
          date: '2024-11-26',
          mood: { id: 'calm', emoji: '🙂', label: 'Tenang', color: '#6BCB77' },
          note: 'Merasa damai dan tenang.'
        },
        {
          date: '2024-11-27',
          mood: { id: 'tired', emoji: '😴', label: 'Lelah', color: '#95A5A6' },
          note: 'Banyak pekerjaan hari ini.'
        },
        {
          date: '2024-11-28',
          mood: { id: 'happy', emoji: '😄', label: 'Senang', color: '#FFD93D' },
          note: 'Bertemu teman lama!'
        },
        {
          date: '2024-11-29',
          mood: { id: 'calm', emoji: '🙂', label: 'Tenang', color: '#6BCB77' },
          note: 'Weekend yang rileks.'
        },
        {
          date: '2024-11-30',
          mood: { id: 'anxious', emoji: '😰', label: 'Cemas', color: '#BA68C8' },
          note: 'Ada deadline besok.'
        },
      ];
      setEntries(sampleData);
      localStorage.setItem('moodly-entries', JSON.stringify(sampleData));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('moodly-entries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = (note: string) => {
    if (!selectedMood) return;

    const today = new Date().toISOString().split('T')[0];
    
    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood,
      note: note
    };

    // Remove existing entry for today if any
    const updatedEntries = entries.filter(entry => entry.date !== today);
    setEntries([...updatedEntries, newEntry]);

    setSelectedMood(null);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleEditMood = () => {
    // Close detail modal and allow editing
    setSelectedDate(null);
    // Could open mood modal for editing here
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const selectedEntry = selectedDate 
    ? entries.find(entry => entry.date === selectedDate) || null
    : null;

  return (
    <div className="relative min-h-screen">
      {/* Pages */}
      {activeTab === 'home' && (
        <HomePage 
          onMoodSelect={handleMoodSelect}
          currentDate={getCurrentDate()}
        />
      )}
      {activeTab === 'calendar' && (
        <CalendarPage 
          entries={entries}
          onDateClick={handleDateClick}
        />
      )}
      {activeTab === 'stats' && (
        <StatisticsPage entries={entries} />
      )}
      {activeTab === 'suggestions' && (
        <SuggestionsPage />
      )}

      {/* Modals */}
      {selectedMood && (
        <MoodModal
          mood={selectedMood}
          onClose={() => setSelectedMood(null)}
          onSave={handleSaveMood}
        />
      )}

      {selectedEntry && (
        <MoodDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedDate(null)}
          onEdit={handleEditMood}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
