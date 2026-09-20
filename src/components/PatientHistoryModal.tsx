import React from 'react';
import { History, Calendar, CheckCircle2, AlertTriangle, AlertOctagon, ArrowRight, Eye, FileText, X } from 'lucide-react';
import { Patient, DRSeverity } from '../types';
import { SAMPLE_FUNDUS_IMAGES } from '../data/mockRetinalData';

interface PatientHistoryModalProps {
  patient: Patient | null;
  onClose: () => void;
  onSelectScreeningHistory?: (id: string) => void;
}

export const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({
  patient,
  onClose,
  onSelectScreeningHistory,
}) => {
  if (!patient) return null;

  // Mock longitudinal screening records for timeline
  const timelineRecords = [
    {
      id: 'SCR-901',
      date: 'Today (30 Aug 2026)',
      severity: 'Moderate NPDR' as DRSeverity,
      confidence: 94.7,
      eye: 'OD (Right Eye)',
      hba1c: '8.4%',
      findings: 'Multiple microaneurysms and blot hemorrhages along temporal arcade. Macula clear.',
      worker: 'Anil Deshmukh (Ramnagar Camp)',
      image: SAMPLE_FUNDUS_IMAGES.moderate,
      status: 'Referral Recommended',
    },
    {
      id: 'SCR-654',
      date: '12 May 2026 (3.5 months ago)',
      severity: 'Mild NPDR' as DRSeverity,
      confidence: 92.4,
      eye: 'OD (Right Eye)',
      hba1c: '7.9%',
      findings: 'Isolated microaneurysms in superior temporal quadrant. No hard exudates.',
      worker: 'Meena R. (Devgarh Camp)',
      image: SAMPLE_FUNDUS_IMAGES.mild,
      status: 'Routine Review',
    },
    {
      id: 'SCR-320',
      date: '04 Jan 2026 (Baseline)',
      severity: 'No DR' as DRSeverity,
      confidence: 98.1,
      eye: 'Both Eyes (OD/OS)',
      hba1c: '7.1%',
      findings: 'Healthy optic nerve head, clear macula, no microvascular lesions.',
      worker: 'Dr. S. Patil',
      image: SAMPLE_FUNDUS_IMAGES.normal,
      status: 'Baseline Clear',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c2caae]/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c2caae]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f1f6e1] flex items-center justify-center text-[#476800]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#191d11]">
                Longitudinal Retinopathy History
              </h3>
              <p className="text-xs text-[#727a62]">
                {patient.name} • {patient.gender}, {patient.age} yrs • ID: {patient.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Progression List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {timelineRecords.map((item, idx) => {
            const isLatest = idx === 0;

            let pillColor = 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]';
            if (item.severity === 'Moderate NPDR') pillColor = 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]';
            if (item.severity === 'Severe NPDR') pillColor = 'bg-[#FFEBEE] text-[#C62828] border-[#EF9A9A]';

            return (
              <div key={item.id} className="relative pl-7 border-l-2 border-[#c2caae]/40 space-y-3">
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                  isLatest ? 'bg-[#476800] ring-4 ring-[#b8ff32]/40' : 'bg-[#727a62]'
                }`}></div>

                {/* Date & Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#191d11]">{item.date}</span>
                    {isLatest && (
                      <span className="px-2 py-0.5 rounded-full bg-[#b8ff32] text-[#050505] text-[10px] font-black uppercase">
                        Current Visit
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${pillColor}`}>
                    {item.severity}
                  </span>
                </div>

                {/* Card with Fundus thumbnail & findings */}
                <div className="bg-[#fafafa] p-4 rounded-2xl border border-[#c2caae]/30 flex flex-col sm:flex-row gap-4 items-start">
                  <img
                    src={item.image}
                    alt="Fundus Thumbnail"
                    className="w-20 h-20 rounded-xl bg-black object-cover border border-[#c2caae]/40 shrink-0"
                  />
                  <div className="space-y-1 text-xs">
                    <p className="text-[#191d11] font-semibold">{item.findings}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#727a62] pt-1">
                      <span>Eye: <strong className="text-[#191d11]">{item.eye}</strong></span>
                      <span>•</span>
                      <span>AI Confidence: <strong className="text-[#476800]">{item.confidence}%</strong></span>
                      <span>•</span>
                      <span>HbA1c: <strong className="text-[#191d11]">{item.hba1c}</strong></span>
                    </div>
                    <p className="text-[11px] text-[#727a62] pt-0.5">Recorded by {item.worker}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#c2caae]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#050505] text-[#ffffff] font-bold text-xs hover:bg-[#1a1a1a]"
          >
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
