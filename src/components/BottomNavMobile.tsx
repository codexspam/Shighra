import React from 'react';
import { Home, PlusCircle, Users, FileText, Share2, Menu } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavMobileProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenMoreMenu?: () => void;
}

export const BottomNavMobile: React.FC<BottomNavMobileProps> = ({
  activeTab,
  setActiveTab,
  onOpenMoreMenu,
}) => {
  const items: { id: NavigationTab | 'more'; label: string; icon: React.ReactNode; isAction?: boolean }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'new-screening', label: 'Screen', icon: <PlusCircle className="w-6 h-6" />, isAction: true },
    { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { id: 'referrals', label: 'Referrals', icon: <Share2 className="w-5 h-5" /> },
  ];

  return (
    <nav 
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/90 backdrop-blur-lg border-t border-[#c2caae]/40 px-3 py-2 flex items-center justify-around shadow-lg safe-area-bottom"
    >
      {items.map((item) => {
        const isActive = activeTab === item.id;
        if (item.isAction) {
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => setActiveTab(item.id as NavigationTab)}
              className="flex flex-col items-center justify-center -mt-5"
            >
              <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isActive ? 'bg-[#050505] text-[#b8ff32] ring-4 ring-[#b8ff32]/30' : 'bg-[#050505] text-[#b8ff32]'
              }`}>
                {item.icon}
              </div>
              <span className="text-[11px] font-bold text-[#191d11] mt-1">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => setActiveTab(item.id as NavigationTab)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors active:scale-95 ${
              isActive ? 'text-[#191d11] font-bold' : 'text-[#727a62] font-medium'
            }`}
          >
            <span className={`transition-colors ${isActive ? 'text-[#050505]' : 'text-[#727a62]'}`}>
              {item.icon}
            </span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#476800] mt-0.5"></div>}
          </button>
        );
      })}
    </nav>
  );
};
