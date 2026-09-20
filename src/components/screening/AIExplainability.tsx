import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Eye } from 'lucide-react';
import { ExplainableFinding, LesionLocation } from '../../types';

interface AIExplainabilityProps {
  findings: ExplainableFinding[];
  onSelectFinding?: (finding: ExplainableFinding) => void;
  selectedFindingId?: string | null;
}

export const AIExplainability: React.FC<AIExplainabilityProps> = ({
  findings,
  onSelectFinding,
  selectedFindingId,
}) => {
  return (
    <div 
      id="ai-explainability-section"
      className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f1f6e1] rounded-full text-[11px] font-extrabold text-[#476800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable AI Findings</span>
          </div>
          <h4 className="font-display font-bold text-2xl text-[#191d11] tracking-tight">
            Why Shighra flagged this image
          </h4>
          <p className="text-xs sm:text-sm text-[#727a62]">
            Detailed lesion breakdown identified by deep neural attention networks.
          </p>
        </div>
      </div>

      {/* Findings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {findings.map((finding) => {
          const isSelected = selectedFindingId === finding.id;

          let statusBadgeClass = 'bg-[#f1f6e1] text-[#476800] border-[#c2caae]/40';
          let statusIcon = <CheckCircle2 className="w-3.5 h-3.5" />;

          if (finding.status === 'Detected') {
            statusBadgeClass = 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]';
            statusIcon = <AlertTriangle className="w-3.5 h-3.5" />;
          } else if (finding.status === 'Not prominent') {
            statusBadgeClass = 'bg-[#ecf0db] text-[#5d5f5d] border-[#c2caae]/30';
            statusIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
          } else {
            statusBadgeClass = 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]';
            statusIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
          }

          return (
            <div
              key={finding.id}
              id={`finding-card-${finding.id}`}
              onClick={() => onSelectFinding?.(finding)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-[#f7fce7] border-[#476800] shadow-sm'
                  : 'bg-[#fafafa] hover:bg-[#f7fce7]/50 border-[#c2caae]/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="font-bold text-base text-[#191d11]">
                    {finding.name}
                  </h5>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass}`}>
                    {statusIcon}
                    <span>{finding.status}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#424934] leading-relaxed">
                  {finding.explanation}
                </p>
              </div>

              {finding.confidence && (
                <div className="flex items-center justify-between pt-2 border-t border-[#c2caae]/20 text-[11px] text-[#727a62]">
                  <span>Feature Confidence</span>
                  <span className="font-bold text-[#191d11]">{finding.confidence}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-[#f1f6e1]/70 border border-[#c2caae]/40 flex items-center gap-3 text-xs text-[#424934]">
        <div className="w-2 h-2 rounded-full bg-[#476800] shrink-0"></div>
        <p>
          AI findings highlight candidate microvascular abnormalities for clinical triage and must be correlated with visual acuity and slit-lamp biomicroscopy.
        </p>
      </div>
    </div>
  );
};
