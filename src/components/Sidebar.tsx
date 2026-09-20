import React from 'react';
import { 
  Home, 
  Eye, 
  Users, 
  FileText, 
  Share2, 
  Tent, 
  BarChart3, 
  GraduationCap, 
  RefreshCw, 
  Settings, 
  User, 
  Lock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isOnline: boolean;
  pendingSyncCount: number;
  onOpenSyncModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenProfileModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOnline,
  pendingSyncCount,
  onOpenSyncModal,
  onOpenSettingsModal,
  onOpenProfileModal,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'new-screening', label: 'New Screening', icon: <Eye className="w-5 h-5" /> },
    { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { id: 'referrals', label: 'Referrals', icon: <Share2 className="w-5 h-5" />, badge: '2' },
    { id: 'camps', label: 'Camps', icon: <Tent className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  ];

  return (
    <aside 
      id="desktop-sidebar"
      className="hidden lg:flex w-72 bg-[#ecf0db]/60 border-r border-[#c2caae]/30 flex-col shrink-0 min-h-screen sticky top-0 py-6 px-4 select-none backdrop-blur-sm z-30"
    >
      {/* Brand Header */}
      <div className="px-3 mb-8 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-[#050505] flex items-center justify-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#b8ff32]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {/* Logo mark: retinal aperture + swift forward motion */}
          <div className="relative flex items-center justify-center">
            <span className="font-display font-extrabold text-xl text-[#b8ff32] tracking-tighter">S</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#b8ff32] animate-pulse"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-display font-extrabold text-xl text-[#191d11] tracking-tight">SHIGHRA</h1>
          </div>
          <p className="text-[11px] font-semibold text-[#424934]/80 tracking-wide uppercase">Precision Medical AI</p>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1.5 px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-[#050505] text-[#b8ff32] shadow-sm translate-x-1'
                  : 'text-[#424934] hover:bg-[#e0e5d0]/70 hover:text-[#191d11]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`transition-transform duration-200 ${isActive ? 'text-[#b8ff32]' : 'text-[#424934] group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className="font-medium tracking-tight text-[15px]">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#b8ff32] text-[#050505]' : 'bg-[#e0e5d0] text-[#191d11]'
                }`}>
                  {item.badge}
                </span>
              )}

              {isActive && (
                <div className="w-1.5 h-4 rounded-full bg-[#b8ff32] absolute right-2.5"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom status & secondary actions */}
      <div className="mt-auto pt-6 border-t border-[#c2caae]/30 space-y-1 px-1">
        {/* Persistent Sync Status Pill */}
        <button
          id="sidebar-sync-button"
          onClick={onOpenSyncModal}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#ffffff]/80 hover:bg-[#ffffff] text-[#191d11] shadow-sm border border-[#c2caae]/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              !isOnline 
                ? 'bg-amber-500 animate-pulse' 
                : pendingSyncCount > 0 
                  ? 'bg-blue-500 animate-pulse' 
                  : 'bg-emerald-500'
            }`}></span>
            <span className="text-[13px]">
              {!isOnline 
                ? 'Offline Mode' 
                : pendingSyncCount > 0 
                  ? `${pendingSyncCount} pending sync` 
                  : 'All Synced'}
            </span>
          </div>
          <RefreshCw className={`w-3.5 h-3.5 text-[#727a62] ${pendingSyncCount > 0 ? 'animate-spin' : ''}`} />
        </button>

        <button
          id="sidebar-settings-button"
          onClick={onOpenSettingsModal}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#424934] hover:bg-[#e0e5d0]/70 transition-colors"
        >
          <Settings className="w-4 h-4 text-[#727a62]" />
          <span className="text-[13px]">Settings</span>
        </button>

        <button
          id="sidebar-profile-button"
          onClick={onOpenProfileModal}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#424934] hover:bg-[#e0e5d0]/70 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#191d11] text-[#b8ff32] text-[11px] font-bold flex items-center justify-center">
            AD
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#191d11] truncate">Anil Deshmukh</p>
            <p className="text-[10px] text-[#727a62] truncate">Field Ophthalmic Tech</p>
          </div>
        </button>

        {/* Security watermark */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-[#727a62]">
          <Lock className="w-3 h-3 text-[#476800]" />
          <span>AES-256 Encrypted Field Store</span>
        </div>
      </div>
    </aside>
  );
};
