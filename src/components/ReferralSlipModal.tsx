import React from 'react';
import { Printer, X, Share2, Building, Calendar, MapPin, AlertTriangle, AlertOctagon, Phone } from 'lucide-react';
import { ReferralRecord } from '../types';

interface ReferralSlipModalProps {
  referral: ReferralRecord | null;
  onClose: () => void;
}

export const ReferralSlipModal: React.FC<ReferralSlipModalProps> = ({
  referral,
  onClose,
}) => {
  if (!referral) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-[#ffffff] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c2caae]/40 my-8 text-[#191d11]">
        {/* Modal Controls (hidden on print) */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c2caae]/30 print:hidden">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#476800]" />
            <h3 className="font-display font-bold text-xl text-[#191d11]">
              Patient Referral Slip
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-[#050505] text-[#b8ff32] text-xs font-bold flex items-center gap-1.5 hover:bg-[#1a1a1a]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Slip Container */}
        <div className="border-2 border-dashed border-[#191d11] p-6 rounded-2xl space-y-5 bg-[#fafdf2]">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-[#c2caae]/40 pb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg text-[#191d11]">SHIGHRA</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#b8ff32] text-[#050505] rounded-full uppercase">
                  Referral Slip
                </span>
              </div>
              <p className="text-xs text-[#727a62]">Rural Health Outreach Screening Camp</p>
            </div>
            <div className="text-right text-xs">
              <p className="font-bold">Slip #: {referral.id}</p>
              <p className="text-[#727a62]">{referral.referralDate}</p>
            </div>
          </div>

          {/* Patient Demographics */}
          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#c2caae]/40 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#727a62] block text-[10px] uppercase font-bold">Patient Name</span>
              <strong className="text-sm text-[#191d11]">{referral.patientName}</strong>
            </div>
            <div>
              <span className="text-[#727a62] block text-[10px] uppercase font-bold">Age / Gender / ID</span>
              <strong>{referral.patientAge} yrs / {referral.patientGender} ({referral.patientId})</strong>
            </div>
            {referral.patientPhone && (
              <div>
                <span className="text-[#727a62] block text-[10px] uppercase font-bold">Contact Phone</span>
                <strong>{referral.patientPhone}</strong>
              </div>
            )}
            <div>
              <span className="text-[#727a62] block text-[10px] uppercase font-bold">Priority Status</span>
              <strong className={referral.priority === 'Urgent' ? 'text-[#ba1a1a]' : 'text-[#F57F17]'}>
                {referral.priority} Referral
              </strong>
            </div>
          </div>

          {/* Referred Center */}
          <div className="space-y-2 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#c2caae]/40 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#476800] flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                <span>Present this slip at:</span>
              </span>
              <p className="font-bold text-sm text-[#191d11]">{referral.referredToCenter}</p>
              <p className="text-[#727a62]">Consulting Specialist: {referral.assignedSpecialist || 'Duty Ophthalmologist / Vitreoretinal Unit'}</p>
              <p className="text-[#476800] font-semibold">Recommended by: {referral.followUpDate}</p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#c2caae]/40 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#727a62]">Screening Reason / Finding:</span>
              <p className="text-[#424934] leading-relaxed">{referral.clinicalNotes}</p>
            </div>
          </div>

          {/* Hospital Counterfoil Box */}
          <div className="border-t border-[#c2caae]/40 pt-4 grid grid-cols-2 gap-4 text-[11px] text-[#727a62]">
            <div>
              <p>Referred by Field Tech: <strong>Anil Deshmukh</strong></p>
              <p>Camp Unit: Solapur Rural Block 4</p>
            </div>
            <div className="text-right">
              <p>Hospital Stamp & Signature</p>
              <div className="h-8 border-b border-dashed border-[#727a62]/60 mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
