import React, { useState } from 'react';
import { RefreshCw, Wifi, WifiOff, CheckCircle2, Database, ShieldCheck, X, HardDrive, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OfflineSyncModalProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingSyncCount: number;
  onTriggerSync: () => Promise<void>;
  onClose: () => void;
  lastSyncTime?: string;
}

export const OfflineSyncModal: React.FC<OfflineSyncModalProps> = ({
  isOnline,
  onToggleOnline,
  pendingSyncCount,
  onTriggerSync,
  onClose,
  lastSyncTime = 'Just now',
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSync = async () => {
    if (!isOnline) {
      setSyncMessage('Cannot sync while offline. Toggle online mode first.');
      return;
    }
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      await onTriggerSync();
      setSyncMessage('All pending screening records synced successfully to regional health cloud.');
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#b8ff32', '#476800', '#10B981'],
        });
      } catch (_) {}
    } catch (e) {
      setSyncMessage('Failed to sync. Please check network connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c2caae]/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c2caae]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#050505] text-[#b8ff32] flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#191d11]">
                Offline & Sync Engine
              </h3>
              <p className="text-xs text-[#727a62]">Rural connectivity management</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Connectivity Switcher */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                <Wifi className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FFEBEE] text-[#C62828] flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="font-bold text-sm text-[#191d11]">
                {isOnline ? 'Online Mode (Cellular / Wi-Fi)' : 'Field Offline Mode'}
              </p>
              <p className="text-xs text-[#727a62]">
                {isOnline ? 'Direct regional sync enabled' : 'Screenings saved securely to on-device store'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleOnline}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              isOnline
                ? 'bg-[#050505] text-[#b8ff32]'
                : 'bg-[#f1f6e1] text-[#191d11] border border-[#c2caae]/40'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        {/* Sync Status Info */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#f1f6e1] border border-[#c2caae]/40 space-y-1">
            <span className="text-[#727a62] font-semibold uppercase text-[10px]">Queue Status</span>
            <p className="font-display font-extrabold text-xl text-[#191d11]">
              {pendingSyncCount} {pendingSyncCount === 1 ? 'Record' : 'Records'} Pending
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f1f6e1] border border-[#c2caae]/40 space-y-1">
            <span className="text-[#727a62] font-semibold uppercase text-[10px]">Last Successful Sync</span>
            <p className="font-bold text-sm text-[#191d11] mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#476800]" />
              <span>{lastSyncTime}</span>
            </p>
          </div>
        </div>

        {/* Local Storage details */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/40 text-xs text-[#424934] space-y-2">
          <div className="flex items-center justify-between font-bold text-[#191d11]">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#476800]" />
              <span>Encrypted Local Cache</span>
            </span>
            <span>18.4 MB used (Max 5 GB)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#ecf0db] overflow-hidden">
            <div className="w-1/12 h-full bg-[#476800]"></div>
          </div>
          <p className="text-[11px] text-[#727a62]">
            Patient fundus photographs are protected with AES-256 local database encryption.
          </p>
        </div>

        {syncMessage && (
          <div className="p-3.5 rounded-2xl bg-[#E8F5E9] border border-[#A5D6A7] text-xs font-semibold text-[#2E7D32] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-[#050505] text-[#ffffff] px-6 py-4 rounded-full font-bold text-sm hover:bg-[#1a1a1a] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-[#b8ff32] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing with Health Cloud...' : 'Sync Pending Records Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
