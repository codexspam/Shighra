import React, { useState } from 'react';
import { Tent, MapPin, Calendar, Users, Plus, CheckCircle2, Clock, AlertTriangle, RefreshCw, ChevronRight } from 'lucide-react';
import { ScreeningCamp } from '../types';
import { INITIAL_CAMPS } from '../data/mockRetinalData';

interface CampsViewProps {
  camps: ScreeningCamp[];
  onSelectCamp?: (camp: ScreeningCamp) => void;
  onNewCamp?: (newCamp: Partial<ScreeningCamp>) => void;
}

export const CampsView: React.FC<CampsViewProps> = ({
  camps = INITIAL_CAMPS,
  onSelectCamp,
  onNewCamp,
}) => {
  const [showNewCampModal, setShowNewCampModal] = useState(false);
  const [campName, setCampName] = useState('');
  const [campLocation, setCampLocation] = useState('');
  const [targetCount, setTargetCount] = useState('35');

  const handleCreateCamp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNewCamp) {
      onNewCamp({
        id: `camp-${Date.now()}`,
        name: campName,
        location: campLocation,
        district: 'Solapur District',
        date: 'Today (Active)',
        targetPatients: parseInt(targetCount, 10) || 30,
        screenedCount: 0,
        pendingReviewCount: 0,
        moderateRiskCount: 0,
        highRiskCount: 0,
        referralsGenerated: 0,
        status: 'Active',
        leadWorker: 'Anil Deshmukh',
        syncState: 'all_synced',
        pendingSyncCount: 0,
      });
    }
    setShowNewCampModal(false);
    setCampName('');
    setCampLocation('');
  };

  return (
    <div id="camps-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
            Screening Camps & Field Units
          </h2>
          <p className="text-base text-[#424934] mt-1">
            Community outreach locations and rural health camp operational targets.
          </p>
        </div>

        <button
          onClick={() => setShowNewCampModal(true)}
          className="bg-[#050505] text-[#ffffff] px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#1a1a1a] active:scale-98 transition-all flex items-center justify-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4 text-[#b8ff32]" />
          <span>Deploy New Outreach Camp</span>
        </button>
      </div>

      {/* Camps List */}
      <div className="space-y-6">
        {camps.map((camp) => {
          const progressPercent = Math.min(100, Math.round((camp.screenedCount / camp.targetPatients) * 100));
          const isActive = camp.status === 'Active';

          return (
            <div
              key={camp.id}
              id={`camp-card-${camp.id}`}
              className={`bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border transition-all space-y-6 ${
                isActive ? 'border-[#476800] ring-1 ring-[#b8ff32]/30' : 'border-[#c2caae]/40'
              }`}
            >
              {/* Camp Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c2caae]/20">
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                    isActive ? 'bg-[#050505] text-[#b8ff32]' : 'bg-[#f1f6e1] text-[#476800]'
                  }`}>
                    <Tent className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#191d11]">
                        {camp.name}
                      </h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]'
                          : camp.status === 'Completed'
                            ? 'bg-[#f1f6e1] text-[#424934]'
                            : 'bg-[#FFF8E1] text-[#F57F17]'
                      }`}>
                        {camp.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#727a62] mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#476800]" />
                        {camp.location} ({camp.district})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {camp.date}
                      </span>
                      <span>•</span>
                      <span>Lead: <strong>{camp.leadWorker}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#476800] px-3 py-1 bg-[#f1f6e1] rounded-full">
                    Sync: {camp.syncState === 'all_synced' ? 'Up to date' : `${camp.pendingSyncCount} pending`}
                  </span>
                </div>
              </div>

              {/* Progress & Stats Row */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#191d11]">
                  <span>Screening Goal Progress</span>
                  <span>{camp.screenedCount} / {camp.targetPatients} Patients ({progressPercent}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#ecf0db] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#476800] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Stat Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#fafafa] rounded-2xl border border-[#c2caae]/30">
                  <p className="text-[10px] font-bold text-[#727a62] uppercase">Screened</p>
                  <p className="font-display font-extrabold text-xl text-[#191d11]">{camp.screenedCount}</p>
                </div>
                <div className="p-3.5 bg-[#FFF8E1] rounded-2xl border border-[#FFE082]">
                  <p className="text-[10px] font-bold text-[#F57F17] uppercase">Moderate Risk</p>
                  <p className="font-display font-extrabold text-xl text-[#F57F17]">{camp.moderateRiskCount}</p>
                </div>
                <div className="p-3.5 bg-[#FFEBEE] rounded-2xl border border-[#EF9A9A]">
                  <p className="text-[10px] font-bold text-[#C62828] uppercase">High Risk</p>
                  <p className="font-display font-extrabold text-xl text-[#ba1a1a]">{camp.highRiskCount}</p>
                </div>
                <div className="p-3.5 bg-[#f1f6e1] rounded-2xl border border-[#c2caae]/30">
                  <p className="text-[10px] font-bold text-[#476800] uppercase">Referrals Generated</p>
                  <p className="font-display font-extrabold text-xl text-[#476800]">{camp.referralsGenerated}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Camp Modal */}
      {showNewCampModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#ffffff] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c2caae]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#c2caae]/30">
              <h4 className="font-display font-bold text-xl text-[#191d11]">
                Deploy New Outreach Camp
              </h4>
              <button
                onClick={() => setShowNewCampModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCamp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#191d11] uppercase">Camp Title</label>
                <input
                  type="text"
                  required
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  placeholder="e.g. Village Health Center - Wardha"
                  className="w-full px-4 py-3 rounded-full bg-[#fafafa] border border-[#c2caae]/60 focus:border-[#476800] text-sm font-semibold outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#191d11] uppercase">Location / Facility</label>
                <input
                  type="text"
                  required
                  value={campLocation}
                  onChange={(e) => setCampLocation(e.target.value)}
                  placeholder="e.g. Primary Health Sub-Center, Wardha"
                  className="w-full px-4 py-3 rounded-full bg-[#fafafa] border border-[#c2caae]/60 focus:border-[#476800] text-sm font-semibold outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#191d11] uppercase">Target Screening Capacity</label>
                <input
                  type="number"
                  required
                  min="5"
                  max="500"
                  value={targetCount}
                  onChange={(e) => setTargetCount(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-[#fafafa] border border-[#c2caae]/60 focus:border-[#476800] text-sm font-semibold outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewCampModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-[#424934] hover:bg-[#f1f6e1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#050505] text-[#b8ff32] font-bold text-xs hover:bg-[#1a1a1a]"
                >
                  Launch Camp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
