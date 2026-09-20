import React from 'react';
import { Printer, Download, X, Eye, ShieldCheck, CheckCircle2, AlertTriangle, AlertOctagon, FileText } from 'lucide-react';
import { ScreeningRecord } from '../types';

interface ReportModalProps {
  screening: ScreeningRecord | null;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  screening,
  onClose,
}) => {
  if (!screening) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-[#ffffff] rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-6 shadow-2xl border border-[#c2caae]/40 my-8">
        {/* Action Header (hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c2caae]/30 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#476800]" />
            <h3 className="font-display font-bold text-xl text-[#191d11]">
              Clinical Screening Report
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-[#050505] text-[#b8ff32] text-xs font-bold flex items-center gap-1.5 hover:bg-[#1a1a1a]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f1f6e1] text-[#424934] flex items-center justify-center hover:bg-[#e0e5d0]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT DOCUMENT */}
        <div id="printable-clinical-report" className="space-y-6 text-[#191d11]">
          {/* Header Banner */}
          <div className="flex justify-between items-start border-b-2 border-[#191d11] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#050505] text-[#b8ff32] font-black flex items-center justify-center text-base">
                  S
                </div>
                <h1 className="font-display font-black text-2xl tracking-tight">SHIGHRA</h1>
              </div>
              <p className="text-xs font-semibold text-[#424934] mt-0.5">
                AI-Powered Diabetic Retinopathy Screening Platform
              </p>
              <p className="text-[11px] text-[#727a62]">Early detection. Anywhere.</p>
            </div>

            <div className="text-right text-xs space-y-0.5">
              <p className="font-bold">Report ID: {screening.id}</p>
              <p className="text-[#727a62]">Date: {screening.timestamp}</p>
              <p className="text-[#727a62]">Facility: {screening.campName || 'Field Screening Unit'}</p>
            </div>
          </div>

          {/* Patient Demographics Box */}
          <div className="bg-[#fafafa] p-4 rounded-2xl border border-[#c2caae]/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#727a62] font-semibold block text-[10px] uppercase">Patient Name</span>
              <strong className="text-sm text-[#191d11]">{screening.patientName}</strong>
            </div>
            <div>
              <span className="text-[#727a62] font-semibold block text-[10px] uppercase">Age / Gender</span>
              <strong>{screening.patientAge} Years / {screening.patientGender}</strong>
            </div>
            <div>
              <span className="text-[#727a62] font-semibold block text-[10px] uppercase">Patient ID</span>
              <strong className="font-mono">{screening.patientId}</strong>
            </div>
            <div>
              <span className="text-[#727a62] font-semibold block text-[10px] uppercase">Screened Eye</span>
              <strong>{screening.eye}</strong>
            </div>
          </div>

          {/* Core Findings & Severity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 rounded-2xl bg-black overflow-hidden border-2 border-[#191d11] flex items-center justify-center">
                <img
                  src={screening.originalImage}
                  alt="Fundus"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="p-4 rounded-2xl bg-[#f1f6e1] border border-[#c2caae]/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#476800]">
                  ICDR Grade & Classification
                </span>
                <h2 className="font-display font-extrabold text-2xl text-[#191d11]">
                  {screening.severity}
                </h2>
                <div className="flex gap-4 text-xs pt-1 text-[#424934]">
                  <span>AI Confidence: <strong className="text-[#476800]">{screening.confidence}%</strong></span>
                  <span>•</span>
                  <span>Quality: <strong>{screening.quality.overallQuality}</strong></span>
                  <span>•</span>
                  <span>Referral: <strong>{screening.referralPriority}</strong></span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-[#424934]">
                <strong className="text-[#191d11] block">Actionable Clinical Recommendation:</strong>
                <p className="leading-relaxed">{screening.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Detailed Findings Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191d11]">
              Explainable AI Feature Findings:
            </h4>
            <div className="border border-[#c2caae]/40 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#fafafa] border-b border-[#c2caae]/30">
                  <tr>
                    <th className="p-2.5 font-bold">Indicator</th>
                    <th className="p-2.5 font-bold">Status</th>
                    <th className="p-2.5 font-bold">Clinical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2caae]/20">
                  {screening.findings.map((f) => (
                    <tr key={f.id}>
                      <td className="p-2.5 font-semibold text-[#191d11]">{f.name}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.status === 'Detected' ? 'bg-[#FFF8E1] text-[#F57F17]' : 'bg-[#E8F5E9] text-[#2E7D32]'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-[#424934]">{f.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signature & Disclaimer Section */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#c2caae]/30 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#727a62]">Screening Technician</p>
              <p className="font-bold text-sm mt-1">{screening.workerName}</p>
              <p className="text-[#727a62]">{screening.workerRole}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-[#727a62]">Reviewing Eye Specialist Signature</p>
              <div className="h-10 border-b border-dashed border-[#727a62] mt-2"></div>
              <p className="text-[10px] text-[#727a62] mt-1">Date: ____________________</p>
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="pt-2 text-[10px] text-[#727a62] leading-tight border-t border-[#c2caae]/20 text-center">
            <strong>NOTICE:</strong> This report is generated by Shighra AI Decision Support and does not constitute an independent medical prescription. Slit-lamp biomicroscopy and dilated indirect ophthalmoscopy are advised for definitive diagnosis.
          </div>
        </div>
      </div>
    </div>
  );
};
