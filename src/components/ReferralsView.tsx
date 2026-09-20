import React, { useState } from 'react';
import { 
  Share2, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Phone, 
  Calendar, 
  MapPin, 
  Building, 
  UserCheck, 
  Plus, 
  Clock,
  Car,
  FileText
} from 'lucide-react';
import { ReferralRecord, ScreeningRecord } from '../types';
import { INITIAL_REFERRALS } from '../data/mockRetinalData';

interface ReferralsViewProps {
  referrals: ReferralRecord[];
  onOpenReportModal?: (screeningId: string) => void;
  onUpdateReferralStatus?: (referralId: string, newStatus: 'Urgent' | 'Recommended' | 'Completed') => void;
  onPrintReferralSlip: (referral: ReferralRecord) => void;
}

export const ReferralsView: React.FC<ReferralsViewProps> = ({
  referrals,
  onOpenReportModal,
  onUpdateReferralStatus,
  onPrintReferralSlip,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Urgent' | 'Recommended' | 'Completed'>('All');

  const filteredReferrals = referrals.filter((r) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Urgent') return r.status === 'Urgent' || r.priority === 'Urgent';
    if (activeTab === 'Recommended') return r.status === 'Recommended';
    if (activeTab === 'Completed') return r.status === 'Completed';
    return true;
  });

  const urgentCount = referrals.filter((r) => r.priority === 'Urgent').length;
  const recommendedCount = referrals.filter((r) => r.priority === 'Recommended' && r.status !== 'Completed').length;

  return (
    <div id="referrals-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
            Specialist Referrals
          </h2>
          <p className="text-base text-[#424934] mt-1">
            Care coordination bridging rural screening camps with district ophthalmic centers.
          </p>
        </div>

        {/* Urgent Alert Pill */}
        {urgentCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFEBEE] border border-[#EF9A9A] text-xs font-bold text-[#ba1a1a] shadow-xs">
            <AlertOctagon className="w-4 h-4 animate-bounce" />
            <span>{urgentCount} Urgent Referrals Require Expedited Transport</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#c2caae]/30 pb-3 overflow-x-auto">
        {[
          { id: 'All', label: `All Referrals (${referrals.length})` },
          { id: 'Urgent', label: `Urgent (${urgentCount})`, highlight: urgentCount > 0 },
          { id: 'Recommended', label: `Recommended (${recommendedCount})` },
          { id: 'Completed', label: `Completed` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#050505] text-[#b8ff32] shadow-xs'
                : tab.highlight
                  ? 'bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A]'
                  : 'bg-[#f1f6e1] text-[#424934] hover:bg-[#e0e5d0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Referrals Cards Grid */}
      <div className="space-y-4">
        {filteredReferrals.map((ref) => {
          const isUrgent = ref.priority === 'Urgent';

          return (
            <div
              key={ref.id}
              id={`referral-card-${ref.id}`}
              className={`bg-[#ffffff] rounded-3xl p-6 sm:p-7 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border transition-all space-y-5 ${
                isUrgent ? 'border-[#EF9A9A] bg-[#FFFBFB]' : 'border-[#c2caae]/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c2caae]/20">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isUrgent ? 'bg-[#FFEBEE] text-[#ba1a1a]' : 'bg-[#FFF8E1] text-[#F57F17]'
                  }`}>
                    {isUrgent ? <AlertOctagon className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg text-[#191d11]">{ref.patientName}</h4>
                      <span className="text-xs font-mono text-[#727a62]">ID: {ref.patientId}</span>
                    </div>
                    <p className="text-xs text-[#727a62]">
                      {ref.patientGender}, {ref.patientAge} yrs • Referral ID: <strong className="text-[#191d11]">{ref.id}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                    isUrgent
                      ? 'bg-[#FFEBEE] text-[#C62828] border-[#EF9A9A]'
                      : 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]'
                  }`}>
                    {ref.priority} Priority
                  </span>
                  <span className="text-xs text-[#727a62]">{ref.referralDate}</span>
                </div>
              </div>

              {/* Center & Clinical Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Destination Center & Specialist */}
                <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#191d11]">
                    <Building className="w-4 h-4 text-[#476800]" />
                    <span>Referred Specialty Center</span>
                  </div>
                  <p className="font-semibold text-sm text-[#191d11]">{ref.referredToCenter}</p>
                  {ref.assignedSpecialist && (
                    <p className="text-[#727a62]">Assigned: <strong className="text-[#191d11]">{ref.assignedSpecialist}</strong></p>
                  )}
                  <div className="flex items-center gap-2 text-[#476800] pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Appointment: <strong className="text-[#191d11]">{ref.followUpDate}</strong></span>
                  </div>
                </div>

                {/* Clinical Findings & Transport */}
                <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#191d11]">
                    <FileText className="w-4 h-4 text-[#476800]" />
                    <span>Clinical Screening Indication</span>
                  </div>
                  <p className="text-[#424934] leading-relaxed">{ref.clinicalNotes}</p>
                  {ref.transportAssistanceRequired && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFEBEE] text-[#C62828] rounded-full font-bold text-[11px]">
                      <Car className="w-3.5 h-3.5" />
                      <span>Camp Transport Coordination Required</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {ref.patientPhone && (
                    <a
                      href={`tel:${ref.patientPhone}`}
                      className="px-4 py-2 rounded-full bg-[#f1f6e1] text-[#191d11] text-xs font-bold flex items-center gap-1.5 hover:bg-[#e0e5d0]"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#476800]" />
                      <span>Call Patient</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`print-slip-btn-${ref.id}`}
                    onClick={() => onPrintReferralSlip(ref)}
                    className="px-5 py-2.5 rounded-full bg-[#050505] text-[#b8ff32] font-bold text-xs hover:bg-[#1a1a1a] flex items-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Referral Slip</span>
                  </button>

                  {ref.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateReferralStatus?.(ref.id, 'Completed')}
                      className="px-4 py-2.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] font-bold text-xs hover:bg-[#C8E6C9] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Seen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
