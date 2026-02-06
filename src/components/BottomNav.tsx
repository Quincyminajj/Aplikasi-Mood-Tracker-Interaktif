import { Home, Calendar, BarChart3, Lightbulb } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'calendar' | 'stats' | 'suggestions';
  onTabChange: (tab: 'home' | 'calendar' | 'stats' | 'suggestions') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Beranda', icon: Home },
    { id: 'calendar' as const, label: 'Kalender', icon: Calendar },
    { id: 'stats' as const, label: 'Statistik', icon: BarChart3 },
    { id: 'suggestions' as const, label: 'Saran', icon: Lightbulb },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 px-4 py-3 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-purple-100 to-pink-50 scale-105' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={22} 
                className={`transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span 
                className={`text-xs transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
