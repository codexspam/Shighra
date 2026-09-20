import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  ChevronRight, 
  History, 
  Eye, 
  FileText, 
  Share2, 
  Calendar,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Phone,
  MapPin
} from 'lucide-react';
import { Patient, ScreeningRecord } from '../types';

interface PatientsViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onViewPatientHistory: (patient: Patient) => void;
  onStartScreeningForPatient: (patient: Patient) => void;
  onNewPatient: () => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  patients,
  onSelectPatient,
  onViewPatientHistory,
  onStartScreeningForPatient,
  onNewPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'High Risk' | 'Moderate Risk' | 'Normal'>('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterSeverity === 'High Risk') {
      return p.latestResult === 'Severe NPDR' || p.latestResult === 'Proliferative DR';
    }
    if (filterSeverity === 'Moderate Risk') {
      return p.latestResult === 'Moderate NPDR' || p.latestResult === 'Mild NPDR';
    }
    if (filterSeverity === 'Normal') {
      return p.latestResult === 'No DR';
    }
    return true;
  });

  return (
    <div id="patients-view-container" className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#191d11] tracking-tight">
            Patient Directory
          </h2>
          <p className="text-base text-[#424934] mt-1">
            {patients.length} registered field screening records across rural health camps.
          </p>
        </div>

        <button
          id="new-patient-registration-btn"
          onClick={onNewPatient}
          className="bg-[#050505] text-[#ffffff] px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#1a1a1a] active:scale-98 transition-all flex items-center justify-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4 text-[#b8ff32]" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#ffffff] p-4 sm:p-5 rounded-3xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#727a62]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, patient ID, village or ward..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#fafafa] border border-[#c2caae]/50 focus:border-[#476800] focus:ring-2 focus:ring-[#b8ff32]/50 text-sm font-semibold text-[#191d11] outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'High Risk', 'Moderate Risk', 'Normal'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterSeverity(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filterSeverity === filter
                  ? 'bg-[#050505] text-[#ffffff] shadow-xs'
                  : 'bg-[#f1f6e1] text-[#424934] hover:bg-[#e0e5d0]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Patients List Grid */}
      <div className="space-y-3.5">
        {filteredPatients.map((patient) => {
          const initials = patient.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();

          let statusBadge = (
            <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Normal</span>
            </span>
          );

          if (patient.latestResult === 'Moderate NPDR') {
            statusBadge = (
              <span className="px-3 py-1 bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082] rounded-full text-xs font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Moderate DR</span>
              </span>
            );
          } else if (patient.latestResult === 'Severe NPDR' || patient.latestResult === 'Proliferative DR') {
            statusBadge = (
              <span className="px-3 py-1 bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A] rounded-full text-xs font-bold flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>High Risk DR</span>
              </span>
            );
          }

          return (
            <div
              key={patient.id}
              id={`patient-row-${patient.id}`}
              className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-[#c2caae]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-[#fafdf2] transition-all group hover:border-[#476800]/40"
            >
              {/* Left Column: Avatar & Demographics */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f1f6e1] border border-[#c2caae]/40 flex items-center justify-center text-[#476800] font-bold text-sm shrink-0">
                  {initials}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="font-bold text-lg text-[#191d11] group-hover:text-[#476800] transition-colors">
                      {patient.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 bg-[#f1f6e1] text-[#424934] rounded-md">
                      {patient.id}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#727a62]">
                    <span>{patient.gender}, {patient.age} yrs</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#727a62]" />
                      {patient.location}
                    </span>
                    {patient.diabetesDurationYears && (
                      <>
                        <span>•</span>
                        <span>Diabetes: {patient.diabetesDurationYears} yrs</span>
                      </>
                    )}
                    {patient.hba1c && (
                      <>
                        <span>•</span>
                        <span>HbA1c: <strong className="text-[#191d11]">{patient.hba1c}</strong></span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Status & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-[#c2caae]/20">
                {statusBadge}

                {/* History Timeline Trigger */}
                <button
                  id={`history-btn-${patient.id}`}
                  onClick={() => onViewPatientHistory(patient)}
                  className="px-4 py-2 rounded-full bg-[#f1f6e1] text-[#191d11] hover:bg-[#e0e5d0] border border-[#c2caae]/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <History className="w-3.5 h-3.5 text-[#476800]" />
                  <span>Timeline</span>
                </button>

                {/* New Screen CTA */}
                <button
                  id={`screen-patient-btn-${patient.id}`}
                  onClick={() => onStartScreeningForPatient(patient)}
                  className="px-4 py-2 rounded-full bg-[#050505] text-[#b8ff32] hover:bg-[#1a1a1a] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Screen Eye</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
