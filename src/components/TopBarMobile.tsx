import React from 'react';
import { RefreshCw, Lock, Plus, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { NavigationTab } from '../types';

interface TopBarMobileProps {
  activeTab: NavigationTab;
  isOnline: boolean;
  pendingSyncCount: number;
  onOpenSyncModal: () => void;
  onStartNewScreening: () => void;
}

export const TopBarMobile: React.FC<TopBarMobileProps> = ({
  activeTab,
  isOnline,
  pendingSyncCount,
  onOpenSyncModal,
  onStartNewScreening,
}) => {
  return (
    <header 
      id="mobile-top-bar"
      className="lg:hidden sticky top-0 z-40 bg-[#f7fce7]/90 backdrop-blur-md border-b border-[#c2caae]/30 px-4 py-3 flex items-center justify-between"
    >
      {/* Shighra Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#050505] flex items-center justify-center shadow-sm">
          <span className="font-display font-extrabold text-sm text-[#b8ff32]">S</span>
        </div>
        <div>
          <h1 className="font-display font-extrabold text-base text-[#191d11] tracking-tight leading-none">SHIGHRA</h1>
          <span className="text-[10px] font-semibold text-[#424934]/80 uppercase tracking-wider">Field Screening</span>
        </div>
      </div>

      {/* Action Badges */}
      <div className="flex items-center gap-2">
        <button
          id="mobile-sync-status-badge"
          onClick={onOpenSyncModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] border border-[#c2caae]/40 text-xs font-semibold text-[#191d11] shadow-xs active:scale-95 transition-transform"
        >
          <span className={`w-2 h-2 rounded-full ${
            !isOnline 
              ? 'bg-amber-500 animate-pulse' 
              : pendingSyncCount > 0 
                ? 'bg-blue-500 animate-pulse' 
                : 'bg-emerald-500'
          }`}></span>
          <span className="text-[11px]">
            {!isOnline 
              ? 'Offline' 
              : pendingSyncCount > 0 
                ? `${pendingSyncCount} Sync` 
                : 'Synced'}
          </span>
        </button>

        {activeTab !== 'new-screening' && (
          <button
            id="mobile-quick-new-screening-btn"
            onClick={onStartNewScreening}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#050505] text-[#b8ff32] text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Screen</span>
          </button>
        )}
      </div>
    </header>
  );
};
