import React, { useState } from 'react';
import { NavigationTab, Patient, ScreeningRecord, ReferralRecord, ScreeningCamp } from './types';
import { 
  INITIAL_PATIENTS, 
  INITIAL_SCREENINGS, 
  INITIAL_REFERRALS, 
  INITIAL_CAMPS 
} from './data/mockRetinalData';

import { Sidebar } from './components/Sidebar';
import { TopBarMobile } from './components/TopBarMobile';
import { BottomNavMobile } from './components/BottomNavMobile';
import { DashboardView } from './components/DashboardView';
import { NewScreeningFlow } from './components/screening/NewScreeningFlow';
import { PatientsView } from './components/PatientsView';
import { PatientHistoryModal } from './components/PatientHistoryModal';
import { ReferralsView } from './components/ReferralsView';
import { ReferralSlipModal } from './components/ReferralSlipModal';
import { CampsView } from './components/CampsView';
import { ReportsView } from './components/ReportsView';
import { AnalyticsView } from './components/AnalyticsView';
import { EducationView } from './components/EducationView';
import { ReportModal } from './components/ReportModal';
import { OfflineSyncModal } from './components/OfflineSyncModal';
import { SettingsModal } from './components/SettingsModal';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  // Core Clinical State
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [screenings, setScreenings] = useState<ScreeningRecord[]>(INITIAL_SCREENINGS);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(INITIAL_REFERRALS);
  const [camps, setCamps] = useState<ScreeningCamp[]>(INITIAL_CAMPS);

  // Connectivity & Sync
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Modals
  const [selectedReportScreening, setSelectedReportScreening] = useState<ScreeningRecord | null>(null);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState<Patient | null>(null);
  const [selectedReferralSlip, setSelectedReferralSlip] = useState<ReferralRecord | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Screening Flow Completion Handler
  const handleScreeningComplete = (newRecord: ScreeningRecord) => {
    setScreenings((prev) => [newRecord, ...prev]);

    // Update or add patient
    setPatients((prev) => {
      const existing = prev.find((p) => p.id === newRecord.patientId);
      if (existing) {
        return prev.map((p) =>
          p.id === newRecord.patientId
            ? {
                ...p,
                lastScreeningDate: 'Today',
                latestResult: newRecord.severity,
                latestConfidence: newRecord.confidence,
                latestRisk: newRecord.riskLevel,
                referralStatus:
                  newRecord.referralPriority === 'Urgent'
                    ? 'Urgent Referral'
                    : newRecord.referralPriority === 'Recommended'
                      ? 'Referral Recommended'
                      : 'Completed',
              }
            : p
        );
      } else {
        const newPat: Patient = {
          id: newRecord.patientId,
          name: newRecord.patientName,
          age: newRecord.patientAge,
          gender: newRecord.patientGender,
          phone: newRecord.patientPhone,
          location: 'Village Health Center Outreach',
          registeredDate: 'Today',
          lastScreeningDate: 'Today',
          latestResult: newRecord.severity,
          latestConfidence: newRecord.confidence,
          latestRisk: newRecord.riskLevel,
          referralStatus:
            newRecord.referralPriority === 'Urgent'
              ? 'Urgent Referral'
              : newRecord.referralPriority === 'Recommended'
                ? 'Referral Recommended'
                : 'Completed',
        };
        return [newPat, ...prev];
      }
    });

    // Update today's camp screened count
    setCamps((prev) =>
      prev.map((c) =>
        c.status === 'Active'
          ? {
              ...c,
              screenedCount: c.screenedCount + 1,
              moderateRiskCount:
                newRecord.severity === 'Moderate NPDR' ? c.moderateRiskCount + 1 : c.moderateRiskCount,
              highRiskCount:
                newRecord.severity === 'Severe NPDR' || newRecord.severity === 'Proliferative DR'
                  ? c.highRiskCount + 1
                  : c.highRiskCount,
            }
          : c
      )
    );

    if (!isOnline) {
      setPendingSyncCount((prev) => prev + 1);
    }
  };

  // Referral Creation Handler
  const handleCreateReferralFromScreening = (record: ScreeningRecord) => {
    const newRef: ReferralRecord = {
      id: `REF-${Math.floor(100 + Math.random() * 900)}`,
      screeningId: record.id,
      patientId: record.patientId,
      patientName: record.patientName,
      patientAge: record.patientAge,
      patientGender: record.patientGender,
      patientPhone: record.patientPhone,
      severity: record.severity,
      confidence: record.confidence,
      priority: record.referralPriority === 'Urgent' ? 'Urgent' : 'Recommended',
      status: record.referralPriority === 'Urgent' ? 'Urgent' : 'Recommended',
      referralDate: 'Today',
      referredToCenter:
        record.referralPriority === 'Urgent'
          ? 'District Civil Hospital Eye Dept. (Solapur)'
          : 'Community Health Centre - Taluka Hospital',
      clinicalNotes: `${record.severity} identified with ${record.confidence}% AI confidence. ${record.recommendation}`,
      transportAssistanceRequired: record.referralPriority === 'Urgent',
      followUpDate: record.referralPriority === 'Urgent' ? 'Within 7 days' : 'Within 4 weeks',
      assignedSpecialist: 'Dr. Vivek Kulkarni, Retinal Specialist',
    };

    setReferrals((prev) => [newRef, ...prev]);
    setActiveTab('referrals');
    setSelectedReferralSlip(newRef);
  };

  // Sync Trigger
  const handleTriggerSync = async () => {
    try {
      const pendingRecords = screenings.filter((s) => s.syncStatus === 'pending');
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: pendingRecords }),
      });
      setPendingSyncCount(0);
      setLastSyncTime('Just now');
      setScreenings((prev) => prev.map((s) => ({ ...s, syncStatus: 'synced' })));
    } catch (e) {
      console.warn('Sync fallback in browser sandbox:', e);
      setPendingSyncCount(0);
      setLastSyncTime('Just now');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fce7] text-[#191d11] flex flex-col lg:flex-row antialiased selection:bg-[#b8ff32] selection:text-[#050505]">
      {/* Desktop Persistent Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
        pendingSyncCount={pendingSyncCount}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenProfileModal={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Mobile Top Header */}
        <TopBarMobile
          activeTab={activeTab}
          isOnline={isOnline}
          pendingSyncCount={pendingSyncCount}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
          onStartNewScreening={() => setActiveTab('new-screening')}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onStartNewScreening={() => setActiveTab('new-screening')}
              onViewCamp={() => setActiveTab('camps')}
              onViewAllPatients={() => setActiveTab('patients')}
              onSelectScreening={(scr) => setSelectedReportScreening(scr)}
              screenings={screenings}
              isOnline={isOnline}
              pendingSyncCount={pendingSyncCount}
              onOpenSyncModal={() => setIsSyncModalOpen(true)}
            />
          )}

          {activeTab === 'new-screening' && (
            <NewScreeningFlow
              onCancel={() => setActiveTab('dashboard')}
              onScreeningComplete={handleScreeningComplete}
              onCreateReferral={handleCreateReferralFromScreening}
              onOpenReportModal={(scr) => setSelectedReportScreening(scr)}
              existingPatients={patients}
              isOnline={isOnline}
            />
          )}

          {activeTab === 'patients' && (
            <PatientsView
              patients={patients}
              onSelectPatient={(pat) => setSelectedPatientHistory(pat)}
              onViewPatientHistory={(pat) => setSelectedPatientHistory(pat)}
              onStartScreeningForPatient={(pat) => {
                setActiveTab('new-screening');
              }}
              onNewPatient={() => setActiveTab('new-screening')}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              screenings={screenings}
              onOpenReportModal={(scr) => setSelectedReportScreening(scr)}
              onCreateReferral={handleCreateReferralFromScreening}
            />
          )}

          {activeTab === 'referrals' && (
            <ReferralsView
              referrals={referrals}
              onPrintReferralSlip={(ref) => setSelectedReferralSlip(ref)}
              onUpdateReferralStatus={(id, status) => {
                setReferrals((prev) =>
                  prev.map((r) => (r.id === id ? { ...r, status } : r))
                );
              }}
            />
          )}

          {activeTab === 'camps' && (
            <CampsView
              camps={camps}
              onNewCamp={(newCamp) => setCamps((prev) => [newCamp as ScreeningCamp, ...prev])}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'education' && <EducationView />}
        </main>

        {/* Mobile Persistent Bottom Nav */}
        <BottomNavMobile
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Global Modals */}
      {selectedReportScreening && (
        <ReportModal
          screening={selectedReportScreening}
          onClose={() => setSelectedReportScreening(null)}
        />
      )}

      {selectedPatientHistory && (
        <PatientHistoryModal
          patient={selectedPatientHistory}
          onClose={() => setSelectedPatientHistory(null)}
        />
      )}

      {selectedReferralSlip && (
        <ReferralSlipModal
          referral={selectedReferralSlip}
          onClose={() => setSelectedReferralSlip(null)}
        />
      )}

      {isSyncModalOpen && (
        <OfflineSyncModal
          isOnline={isOnline}
          onToggleOnline={() => setIsOnline((prev) => !prev)}
          pendingSyncCount={pendingSyncCount}
          onTriggerSync={handleTriggerSync}
          onClose={() => setIsSyncModalOpen(false)}
          lastSyncTime={lastSyncTime}
        />
      )}

      {isSettingsModalOpen && (
        <SettingsModal
          onClose={() => setIsSettingsModalOpen(false)}
          onOpenSyncModal={() => {
            setIsSettingsModalOpen(false);
            setIsSyncModalOpen(true);
          }}
        />
      )}
    </div>
  );
}
export default App;
