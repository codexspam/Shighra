import React from 'react';
import { 
  Plus, 
  Users, 
  Clock, 
  AlertTriangle, 
  AlertOctagon, 
  ChevronRight, 
  Lock, 
  Tent, 
  Sparkles, 
  CheckCircle2,
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { Patient, ScreeningRecord } from '../types';

interface DashboardViewProps {
  onStartNewScreening: () => void;
  onViewCamp: () => void;
  onViewAllPatients: () => void;
  onSelectScreening: (screening: ScreeningRecord) => void;
  screenings: ScreeningRecord[];
  isOnline: boolean;
  pendingSyncCount: number;
  onOpenSyncModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartNewScreening,
  onViewCamp,
  onViewAllPatients,
  onSelectScreening,
  screenings,
  isOnline,
  pendingSyncCount,
  onOpenSyncModal,
}) => {
  // Compute today's dynamic metrics
  const screenedCount = 24 + (screenings.length > 3 ? screenings.length - 3 : 0);
  const pendingCount = screenings.filter(s => s.referralStatus === 'Needs Review' || s.reviewRecommended).length || 6;
  const moderateCount = screenings.filter(s => s.severity === 'Moderate NPDR').length || 4;
  const highRiskCount = screenings.filter(s => s.severity === 'Severe NPDR' || s.severity === 'Proliferative DR').length || 2;

  return (
    <div id="dashboard-view" className="w-full max-w-6xl mx-auto space-y-10 pb-24">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#191d11] tracking-tight">
            Good morning, Anil
          </h2>
          <p className="text-base sm:text-lg text-[#424934] mt-1 font-medium">
            Ready for today's screening?
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="dash-sync-pill"
            onClick={onOpenSyncModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ffffff] shadow-[0px_6px_24px_rgba(0,0,0,0.03)] border border-[#c2caae]/40 text-xs font-semibold text-[#191d11] hover:bg-[#fafafa] transition-colors"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${
              !isOnline 
                ? 'bg-amber-500 animate-pulse' 
                : pendingSyncCount > 0 
                  ? 'bg-blue-500 animate-pulse' 
                  : 'bg-[#10B981]'
            }`}></span>
            <span className="font-medium">
              {!isOnline 
                ? `Offline — ${pendingSyncCount} waiting to sync` 
                : pendingSyncCount > 0 
                  ? `Syncing (${pendingSyncCount} pending)` 
                  : 'Synced'}
            </span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ffffff] shadow-[0px_6px_24px_rgba(0,0,0,0.03)] border border-[#c2caae]/40 text-xs font-semibold text-[#424934]">
            <Lock className="w-4 h-4 text-[#476800]" />
            <span className="font-medium">Patient data is private & secure</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero-banner-card"
        className="relative overflow-hidden rounded-3xl bg-[#ffffff] shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 p-7 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 group"
      >
        {/* Subtle Organic Ambient Gradients */}
        <div className="absolute right-0 top-0 w-2/3 h-full bg-[#b8ff32]/15 rounded-l-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#98da00]/20 rounded-full blur-2xl pointer-events-none -z-0"></div>

        {/* Organic Retinal Vessel Vector Line */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-0" viewBox="0 0 900 400" fill="none">
          <path d="M 100,300 Q 300,100 500,280 T 850,150" stroke="#727a62" strokeWidth="2.5" strokeDasharray="6 6" />
          <path d="M 250,380 Q 450,220 700,340" stroke="#476800" strokeWidth="1.8" />
        </svg>

        {/* Left Content */}
        <div className="flex-1 z-10 space-y-6 max-w-xl">
          {/* AI Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f1f6e1] border border-[#c2caae]/50 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#476800]" />
            <span className="text-[11px] font-extrabold text-[#476800] uppercase tracking-wider">
              AI Insight Active • v3.8
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#191d11] tracking-tight leading-[1.1]">
              Screen eyes.<br />Catch risk early.
            </h3>
            <p className="text-base sm:text-lg text-[#424934] mt-3 font-normal leading-relaxed">
              AI-assisted diabetic retinopathy screening designed for healthcare workers in the field.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              id="hero-new-screening-btn"
              onClick={onStartNewScreening}
              className="bg-[#050505] text-[#ffffff] px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2.5 hover:bg-[#1a1a1a] active:scale-98 transition-all shadow-md group/btn"
            >
              <div className="w-6 h-6 rounded-full bg-[#b8ff32] text-[#050505] flex items-center justify-center font-black text-sm group-hover/btn:rotate-90 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span>New Screening</span>
            </button>

            <button
              id="hero-view-camp-btn"
              onClick={onViewCamp}
              className="bg-[#f1f6e1] text-[#191d11] px-7 py-4 rounded-full font-bold text-base hover:bg-[#e0e5d0] active:scale-98 transition-all border border-[#c2caae]/40 flex items-center justify-center gap-2"
            >
              <Tent className="w-4 h-4 text-[#476800]" />
              <span>View Today's Camp</span>
            </button>
          </div>
        </div>

        {/* Right Iconic Visual */}
        <div className="w-full md:w-auto flex justify-center z-10">
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-[#b8ff32] relative overflow-hidden border-8 border-[#ffffff] shadow-[0px_16px_40px_rgba(184,255,50,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            {/* Eye Icon matching reference */}
            <div className="relative flex items-center justify-center text-[#476800]">
              <Eye className="w-24 h-24 sm:w-28 sm:h-28 stroke-[1.8]" />
              {/* Inner pupil optic ring */}
              <div className="absolute w-7 h-7 rounded-full bg-[#476800] opacity-80"></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#ffffff] -top-1 -right-1"></div>
            </div>
            {/* Gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Today's Screening Stat Cards */}
      <section id="todays-screening-stats" className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-2xl text-[#191d11] tracking-tight">
            Today's Screening
          </h4>
          <span className="text-xs font-semibold text-[#727a62]">
            Village Health Center • Ramnagar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Patients Screened */}
          <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center gap-2.5 text-[#424934]">
              <Users className="w-5 h-5 text-[#476800]" />
              <span className="text-sm font-semibold">Patients Screened</span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#191d11] tracking-tight mt-4">
              {screenedCount}
            </div>
          </div>

          {/* Card 2: Pending Review */}
          <div className="bg-[#ffffff] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center gap-2.5 text-[#424934]">
              <Clock className="w-5 h-5 text-[#727a62]" />
              <span className="text-sm font-semibold">Pending Review</span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#191d11] tracking-tight mt-4">
              {pendingCount}
            </div>
          </div>

          {/* Card 3: Moderate Risk */}
          <div className="bg-[#FFF8E1] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#FFD54F]/40 hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px] relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#FFECB3] rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-2.5 text-[#F57F17] z-10">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-semibold">Moderate Risk</span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#F57F17] tracking-tight mt-4 z-10">
              {moderateCount}
            </div>
          </div>

          {/* Card 4: High Risk */}
          <div className="bg-[#FFEBEE] p-6 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#EF9A9A]/40 hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px] relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#FFCDD2] rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-2.5 text-[#ba1a1a] z-10">
              <AlertOctagon className="w-5 h-5" />
              <span className="text-sm font-semibold">High Risk</span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#ba1a1a] tracking-tight mt-4 z-10">
              {highRiskCount}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Screenings Section */}
      <section id="recent-screenings-section" className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-display font-bold text-2xl text-[#191d11] tracking-tight">
            Recent Screenings
          </h4>
          <button
            id="view-all-patients-btn"
            onClick={onViewAllPatients}
            className="text-xs font-bold text-[#476800] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3.5">
          {screenings.slice(0, 5).map((screening) => {
            const initials = screening.patientName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            // Styling based on severity
            let statusPillBg = 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]';
            let statusIcon = <CheckCircle2 className="w-4 h-4" />;
            let statusText = 'Normal';

            if (screening.severity === 'Moderate NPDR') {
              statusPillBg = 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]';
              statusIcon = <AlertTriangle className="w-4 h-4" />;
              statusText = 'Moderate DR';
            } else if (screening.severity === 'Severe NPDR' || screening.severity === 'Proliferative DR') {
              statusPillBg = 'bg-[#FFEBEE] text-[#C62828] border-[#EF9A9A]';
              statusIcon = <AlertOctagon className="w-4 h-4" />;
              statusText = 'High DR';
            } else if (screening.severity === 'Mild NPDR') {
              statusPillBg = 'bg-[#FFF9C4] text-[#F57F17] border-[#FFF59D]';
              statusIcon = <Info className="w-4 h-4" />;
              statusText = 'Mild DR';
            }

            return (
              <div
                key={screening.id}
                id={`screening-card-${screening.id}`}
                onClick={() => onSelectScreening(screening)}
                className="bg-[#ffffff] p-5 rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fafdf2] transition-all cursor-pointer group hover:border-[#476800]/40"
              >
                {/* Patient avatar & info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f1f6e1] border border-[#c2caae]/40 flex items-center justify-center text-[#476800] font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[#191d11] group-hover:text-[#476800] transition-colors">
                      {screening.patientName}
                    </p>
                    <p className="text-xs text-[#727a62]">
                      {screening.patientGender}, {screening.patientAge} yrs • ID: {screening.patientId} • {screening.eye}
                    </p>
                  </div>
                </div>

                {/* Status, Confidence & Actions */}
                <div className="flex flex-wrap items-center gap-3.5 md:gap-5 justify-start md:justify-end">
                  {/* Status Pill */}
                  <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold ${statusPillBg}`}>
                    {statusIcon}
                    <span>{statusText}</span>
                  </div>

                  {/* AI Confidence */}
                  <div className="flex flex-col items-end min-w-[90px]">
                    <span className="text-[10px] font-semibold text-[#727a62] uppercase tracking-wider">
                      AI Confidence
                    </span>
                    <span className="font-display font-extrabold text-base text-[#191d11]">
                      {Math.round(screening.confidence)}%
                    </span>
                  </div>

                  {/* Review Tag */}
                  <div className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                    screening.severity === 'No DR'
                      ? 'bg-[#ecf0db] text-[#476800]'
                      : screening.severity === 'Severe NPDR'
                        ? 'bg-[#FFCDD2] text-[#B71C1C] flex items-center gap-1'
                        : 'bg-[#ecf0db] text-[#424934]'
                  }`}>
                    {screening.severity === 'Severe NPDR' ? (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Urgent Review</span>
                      </>
                    ) : screening.severity === 'Moderate NPDR' ? (
                      'Needs Review'
                    ) : (
                      'Completed'
                    )}
                  </div>

                  {/* Chevron Button */}
                  <button
                    className="w-10 h-10 rounded-full bg-[#f1f6e1] flex items-center justify-center text-[#424934] group-hover:bg-[#050505] group-hover:text-[#b8ff32] transition-colors ml-auto md:ml-0"
                    aria-label={`View ${screening.patientName} screening result`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
