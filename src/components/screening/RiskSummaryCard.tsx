import React from 'react';
import { Share2, FileText, CheckCircle2, AlertTriangle, AlertOctagon, ArrowRight, ShieldCheck, Download, Printer } from 'lucide-react';
import { DRSeverity, ReferralPriority, RiskLevel, QualityLevel } from '../../types';

interface RiskSummaryCardProps {
  severity: DRSeverity;
  confidence: number;
  quality: QualityLevel;
  referralPriority: ReferralPriority;
  riskLevel: RiskLevel;
  recommendation: string;
  onCreateReferral: () => void;
  onViewReport: () => void;
  onSaveRecord: () => void;
  isSaved?: boolean;
}

export const RiskSummaryCard: React.FC<RiskSummaryCardProps> = ({
  severity,
  confidence,
  quality,
  referralPriority,
  riskLevel,
  recommendation,
  onCreateReferral,
  onViewReport,
  onSaveRecord,
  isSaved = false,
}) => {
  let severityTheme = {
    bg: 'bg-[#FFF8E1]',
    border: 'border-[#FFD54F]',
    text: 'text-[#F57F17]',
    badgeBg: 'bg-[#FFE082]',
    icon: <AlertTriangle className="w-5 h-5 text-[#F57F17]" />,
  };

  if (severity === 'No DR') {
    severityTheme = {
      bg: 'bg-[#E8F5E9]',
      border: 'border-[#A5D6A7]',
      text: 'text-[#2E7D32]',
      badgeBg: 'bg-[#C8E6C9]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />,
    };
  } else if (severity === 'Severe NPDR' || severity === 'Proliferative DR') {
    severityTheme = {
      bg: 'bg-[#FFEBEE]',
      border: 'border-[#EF9A9A]',
      text: 'text-[#C62828]',
      badgeBg: 'bg-[#FFCDD2]',
      icon: <AlertOctagon className="w-5 h-5 text-[#C62828]" />,
    };
  }

  return (
    <div 
      id="risk-summary-card"
      className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-display font-bold text-2xl text-[#191d11] tracking-tight">
          Risk Summary
        </h4>
        <span className="text-xs font-semibold px-3 py-1 bg-[#f1f6e1] text-[#476800] rounded-full border border-[#c2caae]/30">
          Field Screening Evaluation
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* DR Severity */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30">
          <p className="text-[11px] font-semibold text-[#727a62] uppercase tracking-wider">
            DR Severity
          </p>
          <p className="font-display font-extrabold text-base sm:text-lg text-[#191d11] mt-1">
            {severity}
          </p>
        </div>

        {/* AI Confidence */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30">
          <p className="text-[11px] font-semibold text-[#727a62] uppercase tracking-wider">
            AI Confidence
          </p>
          <p className="font-display font-extrabold text-base sm:text-lg text-[#191d11] mt-1 text-[#476800]">
            {confidence}%
          </p>
        </div>

        {/* Image Quality */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30">
          <p className="text-[11px] font-semibold text-[#727a62] uppercase tracking-wider">
            Image Quality
          </p>
          <p className="font-display font-extrabold text-base sm:text-lg text-[#191d11] mt-1">
            {quality}
          </p>
        </div>

        {/* Referral Priority */}
        <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#c2caae]/30">
          <p className="text-[11px] font-semibold text-[#727a62] uppercase tracking-wider">
            Referral Priority
          </p>
          <p className={`font-display font-extrabold text-base sm:text-lg mt-1 ${
            referralPriority === 'Urgent'
              ? 'text-[#ba1a1a]'
              : referralPriority === 'Recommended'
                ? 'text-[#F57F17]'
                : 'text-[#476800]'
          }`}>
            {referralPriority}
          </p>
        </div>
      </div>

      {/* Next Step Box */}
      <div className={`p-5 rounded-2xl border ${severityTheme.bg} ${severityTheme.border} flex items-start gap-4`}>
        <div className="p-2 rounded-xl bg-white shadow-xs shrink-0">
          {severityTheme.icon}
        </div>
        <div className="space-y-1">
          <h5 className="font-bold text-sm sm:text-base text-[#191d11]">
            Recommended Next Step
          </h5>
          <p className="text-xs sm:text-sm text-[#424934] leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        {referralPriority !== 'None' && (
          <button
            id="create-referral-btn"
            onClick={onCreateReferral}
            className="flex-1 bg-[#050505] text-[#ffffff] px-6 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#1a1a1a] active:scale-98 transition-all shadow-md"
          >
            <Share2 className="w-4 h-4 text-[#b8ff32]" />
            <span>Create Referral →</span>
          </button>
        )}

        <button
          id="view-report-btn"
          onClick={onViewReport}
          className="flex-1 bg-[#f1f6e1] text-[#191d11] px-6 py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#e0e5d0] active:scale-98 transition-all border border-[#c2caae]/40 flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-[#476800]" />
          <span>View / Print Report</span>
        </button>

        <button
          id="save-record-btn"
          onClick={onSaveRecord}
          className={`px-6 py-4 rounded-full font-bold text-sm sm:text-base border transition-all flex items-center justify-center gap-2 ${
            isSaved
              ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
              : 'bg-[#ffffff] text-[#191d11] hover:bg-[#fafafa] border-[#c2caae]/40'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isSaved ? 'Saved to Device' : 'Save Record'}</span>
        </button>
      </div>

      {/* Mandatory Medical AI Disclaimer */}
      <div className="pt-3 border-t border-[#c2caae]/20 text-[11px] text-[#727a62] leading-relaxed text-center">
        <strong>Clinical Disclaimer:</strong> AI-assisted screening result — not a standalone medical diagnosis. Clinical confirmation by a qualified eye-care professional (ophthalmologist / optometrist) is mandatory before initiating therapy.
      </div>
    </div>
  );
};
