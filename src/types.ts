export type NavigationTab = 
  | 'dashboard'
  | 'new-screening'
  | 'patients'
  | 'reports'
  | 'referrals'
  | 'camps'
  | 'analytics'
  | 'education';

export type ScreeningStep = 'patient' | 'capture' | 'quality' | 'analyzing' | 'result';

export type QualityLevel = 'GOOD' | 'BORDERLINE' | 'POOR';

export interface QualityMetrics {
  overallQuality: QualityLevel;
  focusScore: number;
  brightnessScore: number;
  fovScore: number;
  retinalVisibilityScore: number;
  artifactScore: number;
  issues: string[];
  suggestions: string[];
}

export type DRSeverity = 
  | 'No DR'
  | 'Mild NPDR'
  | 'Moderate NPDR'
  | 'Severe NPDR'
  | 'Proliferative DR';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'urgent';
export type ReferralPriority = 'None' | 'Routine' | 'Recommended' | 'Urgent';

export interface LesionLocation {
  id: string;
  type: 'microaneurysm' | 'hemorrhage' | 'exudate' | 'cotton_wool' | 'neovascularization';
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

export interface ExplainableFinding {
  id: string;
  name: string;
  status: 'Detected' | 'Not prominent' | 'Absent';
  confidence?: number;
  explanation: string;
  lesions?: LesionLocation[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  location: string;
  campId?: string;
  diabetesDurationYears?: number;
  knownHistory?: string;
  hba1c?: string;
  registeredDate: string;
  lastScreeningDate?: string;
  latestResult?: DRSeverity;
  latestConfidence?: number;
  latestRisk?: RiskLevel;
  referralStatus?: 'None' | 'Pending Review' | 'Referral Recommended' | 'Urgent Referral' | 'Completed';
}

export interface ScreeningRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone?: string;
  diabetesDurationYears?: number;
  knownHistory?: string;
  eye: 'OD (Right Eye)' | 'OS (Left Eye)';
  timestamp: string;
  imageThumbnail: string;
  originalImage: string;
  heatmapImage?: string;
  lesionsOverlayImage?: string;
  quality: QualityMetrics;
  severity: DRSeverity;
  confidence: number;
  riskLevel: RiskLevel;
  referralPriority: ReferralPriority;
  reviewRecommended: boolean;
  findings: ExplainableFinding[];
  lesions: LesionLocation[];
  recommendation: string;
  workerName: string;
  workerRole: string;
  campId?: string;
  campName?: string;
  syncStatus: 'synced' | 'pending' | 'syncing';
  referralStatus: 'None' | 'Needs Review' | 'Referral Created' | 'Completed';
  notes?: string;
}

export interface ReferralRecord {
  id: string;
  screeningId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone?: string;
  severity: DRSeverity;
  confidence: number;
  priority: 'Urgent' | 'Recommended' | 'Routine';
  status: 'Urgent' | 'Recommended' | 'Completed';
  referralDate: string;
  referredToCenter: string;
  clinicalNotes: string;
  transportAssistanceRequired: boolean;
  followUpDate: string;
  assignedSpecialist?: string;
}

export interface ScreeningCamp {
  id: string;
  name: string;
  location: string;
  district: string;
  date: string;
  targetPatients: number;
  screenedCount: number;
  pendingReviewCount: number;
  moderateRiskCount: number;
  highRiskCount: number;
  referralsGenerated: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  leadWorker: string;
  syncState: 'all_synced' | 'pending_records';
  pendingSyncCount: number;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Grading' | 'Field Imaging' | 'Referral Protocol';
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  imageUrl: string;
  badge?: string;
}
