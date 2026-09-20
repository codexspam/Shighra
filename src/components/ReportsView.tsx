import React, { useState } from 'react';
import { FileText, Download, Printer, Search, Eye, Filter, CheckCircle2, AlertTriangle, AlertOctagon, Share2 } from 'lucide-react';
import { ScreeningRecord } from '../types';

interface ReportsViewProps {
  screenings: ScreeningRecord[];
  onOpenReportModal: (record: ScreeningRecord) => void;
  onCreateReferral: (record: ScreeningRecord) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  screenings,
  onOpenReportModal,
  onCreateReferral,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScreenings = screenings.filter((s) =>
    s.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['ScreeningID', 'PatientID', 'Name', 'Age', 'Gender', 'Eye', 'DR_Severity', 'Confidence', 'Quality', 'ReferralPriority', 'Timestamp'];
    const rows = filteredScreenings.map(s => [
      s.id,
      s.patientId,
      `"${s.patientName}"`,
      s.patientAge,
      s.patientGender,
      s.eye,
      `"${s.severity}"`,
      `${s.confidence}%`,
      s.quality.overallQuality,
      s.referralPriority,
      `"${s.timestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SHIGHRA_Screenings_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="reports-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
            Screening Reports & Audit
          </h2>
          <p className="text-base text-[#424934] mt-1">
            Clinical fundus assessments, AI inference reports, and diagnostic logs.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="bg-[#f1f6e1] text-[#191d11] hover:bg-[#e0e5d0] border border-[#c2caae]/40 px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 self-start sm:self-auto transition-colors"
        >
          <Download className="w-4 h-4 text-[#476800]" />
          <span>Export Registry (CSV)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#ffffff] p-4 sm:p-5 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#727a62]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report by patient name, screening ID, or patient ID..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#fafafa] border border-[#c2caae]/50 focus:border-[#476800] text-sm font-semibold outline-none"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="space-y-4">
        {filteredScreenings.map((screening) => {
          let pill = (
            <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Normal</span>
            </span>
          );

          if (screening.severity === 'Moderate NPDR') {
            pill = (
              <span className="px-3 py-1 bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082] rounded-full text-xs font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Moderate DR</span>
              </span>
            );
          } else if (screening.severity === 'Severe NPDR' || screening.severity === 'Proliferative DR') {
            pill = (
              <span className="px-3 py-1 bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A] rounded-full text-xs font-bold flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>High Risk</span>
              </span>
            );
          }

          return (
            <div
              key={screening.id}
              id={`report-row-${screening.id}`}
              className="bg-[#ffffff] rounded-2xl p-5 sm:p-6 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/30 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-[#fafdf2] transition-all"
            >
              {/* Left Column */}
              <div className="flex items-center gap-4">
                <img
                  src={screening.originalImage}
                  alt="Fundus"
                  className="w-16 h-16 rounded-xl bg-black object-cover border border-[#c2caae]/30 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base sm:text-lg text-[#191d11]">
                      {screening.patientName}
                    </h4>
                    <span className="text-xs font-mono px-2 py-0.5 bg-[#f1f6e1] text-[#424934] rounded">
                      {screening.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#727a62]">
                    {screening.patientGender}, {screening.patientAge} yrs • {screening.eye} • Recorded {screening.timestamp}
                  </p>
                </div>
              </div>

              {/* Right Column: Badges & CTAs */}
              <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
                {pill}

                <div className="text-right pr-2">
                  <p className="text-[10px] font-bold text-[#727a62] uppercase">AI Confidence</p>
                  <p className="font-extrabold text-sm text-[#191d11]">{screening.confidence}%</p>
                </div>

                <button
                  id={`view-full-report-btn-${screening.id}`}
                  onClick={() => onOpenReportModal(screening)}
                  className="px-5 py-2.5 rounded-full bg-[#050505] text-[#b8ff32] font-bold text-xs hover:bg-[#1a1a1a] flex items-center gap-1.5 shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Clinical Report</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
