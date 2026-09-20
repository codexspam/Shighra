import { 
  Patient, 
  ScreeningRecord, 
  ReferralRecord, 
  ScreeningCamp, 
  EducationalArticle,
  LesionLocation,
  ExplainableFinding
} from '../types';

// Helper to generate medically realistic fundus SVG Data URLs
export function generateFundusDataUrl(type: 'normal' | 'moderate' | 'severe' | 'mild' | 'blurry_dark'): string {
  const isDark = type === 'blurry_dark';
  const bgGradient = isDark 
    ? `<radialGradient id="bg" cx="45%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#3d180a" />
        <stop offset="60%" stop-color="#1f0904" />
        <stop offset="100%" stop-color="#080201" />
       </radialGradient>`
    : `<radialGradient id="bg" cx="48%" cy="48%" r="55%">
        <stop offset="0%" stop-color="#d9532f" />
        <stop offset="35%" stop-color="#b83818" />
        <stop offset="70%" stop-color="#801c0b" />
        <stop offset="100%" stop-color="#3b0802" />
       </radialGradient>`;

  // Disc & Macula
  const discX = 260;
  const discY = 380;
  const maculaX = 490;
  const maculaY = 385;

  let lesionsSvg = '';
  if (type === 'moderate' || type === 'severe') {
    lesionsSvg += `
      <!-- Microaneurysms (red dots) -->
      <circle cx="430" cy="320" r="3.5" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
      <circle cx="415" cy="345" r="2.8" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
      <circle cx="560" cy="330" r="3.2" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
      <circle cx="520" cy="460" r="2.5" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
      <circle cx="470" cy="490" r="3.8" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
      <circle cx="390" cy="420" r="2.6" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />

      <!-- Blot & Flame Hemorrhages -->
      <ellipse cx="445" cy="290" rx="14" ry="7" transform="rotate(-15 445 290)" fill="#450000" stroke="#750202" stroke-width="1" opacity="0.95" />
      <ellipse cx="540" cy="360" rx="11" ry="8" transform="rotate(30 540 360)" fill="#400000" stroke="#700000" stroke-width="1" opacity="0.92" />
      <ellipse cx="480" cy="440" rx="16" ry="6" transform="rotate(-35 480 440)" fill="#450000" stroke="#750202" stroke-width="1" opacity="0.95" />
      <ellipse cx="370" cy="340" rx="9" ry="5" transform="rotate(20 370 340)" fill="#450000" opacity="0.9" />

      <!-- Hard Exudates (waxy yellow lipid deposits) -->
      <path d="M 520,310 Q 535,305 545,315 Q 540,328 525,322 Z" fill="#ffeaa7" opacity="0.85" filter="drop-shadow(0 0 2px #d4ac0d)" />
      <circle cx="550" cy="318" r="3" fill="#fff9c4" opacity="0.9" />
      <circle cx="512" cy="302" r="2.5" fill="#fff9c4" opacity="0.9" />
      <circle cx="538" cy="298" r="2" fill="#fff9c4" opacity="0.8" />
    `;
  }

  if (type === 'severe') {
    lesionsSvg += `
      <!-- Additional Heavy Hemorrhages & Cotton Wool Spot -->
      <ellipse cx="410" cy="250" rx="22" ry="10" transform="rotate(10 410 250)" fill="#350000" opacity="0.96" />
      <ellipse cx="320" cy="460" rx="18" ry="9" transform="rotate(-40 320 460)" fill="#350000" opacity="0.96" />
      <ellipse cx="590" cy="420" rx="20" ry="12" transform="rotate(25 590 420)" fill="#350000" opacity="0.96" />
      <!-- Cotton wool spot (fluffy white axoplasmic build-up) -->
      <circle cx="360" cy="280" r="14" fill="#f5f6fa" opacity="0.65" filter="blur(3px)" />
      <circle cx="560" cy="470" r="12" fill="#f5f6fa" opacity="0.6" filter="blur(3px)" />
      <!-- Venous beading & loops -->
      <path d="M 270,330 Q 300,280 340,240" stroke="#250000" stroke-width="8" fill="none" stroke-dasharray="14 4" stroke-linecap="round" />
    `;
  }

  if (type === 'mild') {
    lesionsSvg += `
      <!-- Isolated Microaneurysms only -->
      <circle cx="440" cy="330" r="3.2" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.95" />
      <circle cx="530" cy="370" r="2.8" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.95" />
      <circle cx="460" cy="430" r="2.5" fill="#500202" stroke="#ff3b30" stroke-width="0.8" opacity="0.9" />
    `;
  }

  const blurFilter = isDark ? `filter="blur(5px)" opacity="0.6"` : '';

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 760" width="760" height="760">
    <defs>
      ${bgGradient}
      <radialGradient id="discGrad" cx="45%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#fff8db" />
        <stop offset="40%" stop-color="#fed330" />
        <stop offset="85%" stop-color="#fa8231" />
        <stop offset="100%" stop-color="#eb3b5a" />
      </radialGradient>
      <radialGradient id="maculaGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2c0c05" />
        <stop offset="40%" stop-color="#4e1307" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
      <radialGradient id="choroid" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,0,0,0)" />
        <stop offset="80%" stop-color="rgba(0,0,0,0.2)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.85)" />
      </radialGradient>
    </defs>

    <!-- Retina boundary / circular fundus aperture -->
    <rect width="760" height="760" fill="#000000" />
    <circle cx="380" cy="380" r="360" fill="url(#bg)" ${blurFilter} />

    <!-- Organic choroidal texture lines -->
    <g opacity="${isDark ? '0.1' : '0.18'}" stroke="#4a0f05" stroke-width="2" fill="none">
      <path d="M 120,200 Q 280,380 440,220 T 700,340" />
      <path d="M 80,480 Q 240,400 480,560 T 680,480" />
      <path d="M 200,100 Q 380,300 560,140" />
      <path d="M 150,600 Q 380,480 620,620" />
    </g>

    <!-- Optic Disc -->
    <ellipse cx="${discX}" cy="${discY}" rx="38" ry="48" fill="url(#discGrad)" opacity="0.95" />
    <!-- Optic Cup -->
    <ellipse cx="${discX + 2}" cy="${discY - 2}" rx="18" ry="24" fill="#ffffff" opacity="0.85" />

    <!-- Macula (Fovea centralis) -->
    <circle cx="${maculaX}" cy="${maculaY}" r="75" fill="url(#maculaGrad)" opacity="0.9" />
    <circle cx="${maculaX}" cy="${maculaY}" r="3" fill="#ffeaa7" opacity="0.4" />

    <!-- Superior & Inferior Retinal Vascular Arcades -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Deep veins (darker, wider) -->
      <path d="M ${discX},${discY} Q 290,260 380,210 T 540,210 T 640,270" stroke="#3d0303" stroke-width="8" opacity="0.9" />
      <path d="M ${discX},${discY} Q 290,500 390,550 T 560,540 T 650,470" stroke="#3d0303" stroke-width="8" opacity="0.9" />
      <path d="M ${discX},${discY} Q 200,340 140,280" stroke="#3d0303" stroke-width="6" opacity="0.85" />
      <path d="M ${discX},${discY} Q 190,430 130,480" stroke="#3d0303" stroke-width="6" opacity="0.85" />

      <!-- Retinal Arteries (brighter red with light reflex) -->
      <path d="M ${discX},${discY} Q 305,275 390,230 T 530,235 T 625,290" stroke="#b31212" stroke-width="5" opacity="0.95" />
      <path d="M ${discX},${discY} Q 305,485 395,530 T 545,520 T 635,450" stroke="#b31212" stroke-width="5" opacity="0.95" />
      
      <!-- Small arteriolar branches towards macula and periphery -->
      <path d="M 380,210 Q 420,280 460,330" stroke="#a30f0f" stroke-width="3" opacity="0.85" />
      <path d="M 540,210 Q 520,290 500,340" stroke="#a30f0f" stroke-width="2.8" opacity="0.85" />
      <path d="M 390,550 Q 430,480 470,440" stroke="#a30f0f" stroke-width="3" opacity="0.85" />
      <path d="M 560,540 Q 530,470 510,430" stroke="#a30f0f" stroke-width="2.8" opacity="0.85" />

      <!-- Arterial central light reflex highlights -->
      <path d="M ${discX + 15},${discY - 25} Q 305,275 390,230 T 530,235" stroke="#ff8b8b" stroke-width="1.2" opacity="0.75" />
      <path d="M ${discX + 15},${discY + 25} Q 305,485 395,530 T 545,520" stroke="#ff8b8b" stroke-width="1.2" opacity="0.75" />
    </g>

    <!-- Pathological Lesions Layer -->
    ${lesionsSvg}

    <!-- Lens Vignette and Aperture rim -->
    <circle cx="380" cy="380" r="360" fill="url(#choroid)" />
    <circle cx="380" cy="380" r="361" fill="none" stroke="#050505" stroke-width="6" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// Sample clinical fundus images
export const SAMPLE_FUNDUS_IMAGES = {
  moderate: generateFundusDataUrl('moderate'),
  normal: generateFundusDataUrl('normal'),
  severe: generateFundusDataUrl('severe'),
  mild: generateFundusDataUrl('mild'),
  blurry_dark: generateFundusDataUrl('blurry_dark'),
};

// Realistic Lesion points for explainable UI overlays
export const SAMPLE_LESIONS_MODERATE: LesionLocation[] = [
  {
    id: 'lesion-1',
    type: 'microaneurysm',
    label: 'Microaneurysm cluster',
    x: 56.5,
    y: 42.1,
    size: 24,
    severity: 'moderate',
    description: 'Focal dilation of retinal capillaries with weakened vessel walls in paramacular region.',
  },
  {
    id: 'lesion-2',
    type: 'hemorrhage',
    label: 'Blot Hemorrhage',
    x: 58.5,
    y: 38.2,
    size: 38,
    severity: 'high',
    description: 'Intraretinal hemorrhage located in deep inner nuclear layer along superior arcade.',
  },
  {
    id: 'lesion-3',
    type: 'exudate',
    label: 'Hard Lipid Exudate',
    x: 69.7,
    y: 41.5,
    size: 32,
    severity: 'moderate',
    description: 'Lipoprotein and lipid transudate from chronic vascular hyperpermeability.',
  },
  {
    id: 'lesion-4',
    type: 'hemorrhage',
    label: 'Flame-shaped Hemorrhage',
    x: 63.2,
    y: 57.8,
    size: 36,
    severity: 'moderate',
    description: 'Superficial retinal nerve fiber layer hemorrhage aligned with nerve bundles.',
  },
  {
    id: 'lesion-5',
    type: 'microaneurysm',
    label: 'Isolated Microaneurysm',
    x: 51.3,
    y: 64.5,
    size: 20,
    severity: 'low',
    description: 'Early vascular indicator in inferior temporal quadrant.',
  },
];

export const SAMPLE_FINDINGS_MODERATE: ExplainableFinding[] = [
  {
    id: 'microaneurysms',
    name: 'Microaneurysm indicators',
    status: 'Detected',
    confidence: 96.2,
    explanation: 'Small vessel abnormalities and focal capillary outpouchings were detected in regions highlighted by the AI.',
    lesions: [SAMPLE_LESIONS_MODERATE[0], SAMPLE_LESIONS_MODERATE[4]],
  },
  {
    id: 'hemorrhages',
    name: 'Hemorrhage indicators',
    status: 'Detected',
    confidence: 93.8,
    explanation: 'Dot and blot intraretinal hemorrhages observed along superior and inferior vascular arcades.',
    lesions: [SAMPLE_LESIONS_MODERATE[1], SAMPLE_LESIONS_MODERATE[3]],
  },
  {
    id: 'exudates',
    name: 'Exudate indicators',
    status: 'Not prominent',
    confidence: 88.4,
    explanation: 'Small discrete lipid deposits noted temporally; no macular-threatening circinate rings detected.',
    lesions: [SAMPLE_LESIONS_MODERATE[2]],
  },
  {
    id: 'vessel',
    name: 'Vessel abnormalities',
    status: 'Detected',
    confidence: 91.5,
    explanation: 'Mild venous caliber irregularity and localized dilation observed adjacent to temporal arcade.',
  },
  {
    id: 'macular',
    name: 'Macular involvement',
    status: 'Absent',
    confidence: 97.4,
    explanation: 'Central foveal avascular zone (FAZ) appears well-preserved with no detectable clinically significant macular edema (CSME).',
  },
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'P-20394',
    name: 'Ravi Kumar',
    age: 52,
    gender: 'Male',
    phone: '+91 98450 23145',
    location: 'Village Ramnagar, Block 4',
    campId: 'camp-1',
    diabetesDurationYears: 8,
    knownHistory: 'Type 2 Diabetes mellitus, hypertension',
    hba1c: '8.4%',
    registeredDate: '2026-08-30',
    lastScreeningDate: '2026-08-30',
    latestResult: 'Moderate NPDR',
    latestConfidence: 94.7,
    latestRisk: 'moderate',
    referralStatus: 'Referral Recommended',
  },
  {
    id: 'P-20395',
    name: 'Lakshmi Devi',
    age: 61,
    gender: 'Female',
    phone: '+91 94481 87210',
    location: 'Village Devgarh, Main Gali',
    campId: 'camp-1',
    diabetesDurationYears: 4,
    knownHistory: 'Type 2 Diabetes, diet controlled',
    hba1c: '6.9%',
    registeredDate: '2026-08-30',
    lastScreeningDate: '2026-08-30',
    latestResult: 'No DR',
    latestConfidence: 98.2,
    latestRisk: 'low',
    referralStatus: 'Completed',
  },
  {
    id: 'P-20396',
    name: 'Mohammed Ali',
    age: 58,
    gender: 'Male',
    phone: '+91 97412 55431',
    location: 'Village Ramnagar, Ward 2',
    campId: 'camp-1',
    diabetesDurationYears: 14,
    knownHistory: 'Insulin-dependent Diabetes, blurriness in OD',
    hba1c: '10.2%',
    registeredDate: '2026-08-30',
    lastScreeningDate: '2026-08-30',
    latestResult: 'Severe NPDR',
    latestConfidence: 91.4,
    latestRisk: 'urgent',
    referralStatus: 'Urgent Referral',
  },
  {
    id: 'P-20397',
    name: 'Priya Sharma',
    age: 46,
    gender: 'Female',
    phone: '+91 96110 39822',
    location: 'Village Chandrapur, Post 7',
    campId: 'camp-1',
    diabetesDurationYears: 6,
    knownHistory: 'Metformin 500mg BD',
    hba1c: '7.8%',
    registeredDate: '2026-08-30',
    lastScreeningDate: '2026-08-30',
    latestResult: 'Mild NPDR',
    latestConfidence: 92.8,
    latestRisk: 'moderate',
    referralStatus: 'Pending Review',
  },
  {
    id: 'P-20398',
    name: 'Anand Patil',
    age: 67,
    gender: 'Male',
    phone: '+91 98860 11984',
    location: 'Village Devgarh, Near Temple',
    campId: 'camp-2',
    diabetesDurationYears: 11,
    knownHistory: 'Type 2 Diabetes, previous laser 3 yrs ago',
    hba1c: '8.9%',
    registeredDate: '2026-08-28',
    lastScreeningDate: '2026-08-28',
    latestResult: 'Moderate NPDR',
    latestConfidence: 95.1,
    latestRisk: 'moderate',
    referralStatus: 'Referral Recommended',
  },
  {
    id: 'P-20399',
    name: 'Sunita Patel',
    age: 50,
    gender: 'Female',
    phone: '+91 99002 44781',
    location: 'Village Ramnagar, School Road',
    campId: 'camp-1',
    diabetesDurationYears: 3,
    knownHistory: 'Recent diagnosis, asymptomatic',
    hba1c: '7.1%',
    registeredDate: '2026-08-30',
    lastScreeningDate: '2026-08-30',
    latestResult: 'No DR',
    latestConfidence: 97.6,
    latestRisk: 'low',
    referralStatus: 'Completed',
  },
];

export const INITIAL_SCREENINGS: ScreeningRecord[] = [
  {
    id: 'SCR-901',
    patientId: 'P-20394',
    patientName: 'Ravi Kumar',
    patientAge: 52,
    patientGender: 'Male',
    patientPhone: '+91 98450 23145',
    diabetesDurationYears: 8,
    knownHistory: 'Type 2 Diabetes mellitus, hypertension',
    eye: 'OD (Right Eye)',
    timestamp: 'Today, 09:42 AM',
    imageThumbnail: SAMPLE_FUNDUS_IMAGES.moderate,
    originalImage: SAMPLE_FUNDUS_IMAGES.moderate,
    quality: {
      overallQuality: 'GOOD',
      focusScore: 96,
      brightnessScore: 94,
      fovScore: 98,
      retinalVisibilityScore: 95,
      artifactScore: 5,
      issues: [],
      suggestions: ['Clear optic disc and fovea delineation.'],
    },
    severity: 'Moderate NPDR',
    confidence: 94.7,
    riskLevel: 'moderate',
    referralPriority: 'Recommended',
    reviewRecommended: true,
    findings: SAMPLE_FINDINGS_MODERATE,
    lesions: SAMPLE_LESIONS_MODERATE,
    recommendation: 'Refer the patient for comprehensive dilated fundus examination by an eye-care professional / ophthalmologist.',
    workerName: 'Anil Deshmukh',
    workerRole: 'Senior Community Ophthalmic Technician',
    campId: 'camp-1',
    campName: 'Village Health Center - Ramnagar',
    syncStatus: 'synced',
    referralStatus: 'Referral Created',
  },
  {
    id: 'SCR-902',
    patientId: 'P-20395',
    patientName: 'Lakshmi Devi',
    patientAge: 61,
    patientGender: 'Female',
    patientPhone: '+91 94481 87210',
    diabetesDurationYears: 4,
    knownHistory: 'Type 2 Diabetes, diet controlled',
    eye: 'OD (Right Eye)',
    timestamp: 'Today, 09:15 AM',
    imageThumbnail: SAMPLE_FUNDUS_IMAGES.normal,
    originalImage: SAMPLE_FUNDUS_IMAGES.normal,
    quality: {
      overallQuality: 'GOOD',
      focusScore: 98,
      brightnessScore: 95,
      fovScore: 99,
      retinalVisibilityScore: 98,
      artifactScore: 2,
      issues: [],
      suggestions: ['Optimal image acquisition parameters.'],
    },
    severity: 'No DR',
    confidence: 98.2,
    riskLevel: 'low',
    referralPriority: 'None',
    reviewRecommended: false,
    findings: [
      {
        id: 'microaneurysms',
        name: 'Microaneurysm indicators',
        status: 'Absent',
        confidence: 98.6,
        explanation: 'No focal capillary microaneurysms detected across all retinal quadrants.',
      },
      {
        id: 'hemorrhages',
        name: 'Hemorrhage indicators',
        status: 'Absent',
        confidence: 99.1,
        explanation: 'Clear retinal parenchyma without intraretinal hemorrhages.',
      },
      {
        id: 'exudates',
        name: 'Exudate indicators',
        status: 'Absent',
        confidence: 98.9,
        explanation: 'No lipid deposits, exudates, or cotton wool spots.',
      },
    ],
    lesions: [],
    recommendation: 'Annual routine screening recommended. Maintain glycemic and blood pressure control.',
    workerName: 'Anil Deshmukh',
    workerRole: 'Senior Community Ophthalmic Technician',
    campId: 'camp-1',
    campName: 'Village Health Center - Ramnagar',
    syncStatus: 'synced',
    referralStatus: 'Completed',
  },
  {
    id: 'SCR-903',
    patientId: 'P-20396',
    patientName: 'Mohammed Ali',
    patientAge: 58,
    patientGender: 'Male',
    patientPhone: '+91 97412 55431',
    diabetesDurationYears: 14,
    knownHistory: 'Insulin-dependent Diabetes, blurriness in OD',
    eye: 'OS (Left Eye)',
    timestamp: 'Today, 08:50 AM',
    imageThumbnail: SAMPLE_FUNDUS_IMAGES.severe,
    originalImage: SAMPLE_FUNDUS_IMAGES.severe,
    quality: {
      overallQuality: 'GOOD',
      focusScore: 92,
      brightnessScore: 90,
      fovScore: 95,
      retinalVisibilityScore: 93,
      artifactScore: 8,
      issues: [],
      suggestions: ['Sufficient diagnostic clarity.'],
    },
    severity: 'Severe NPDR',
    confidence: 91.4,
    riskLevel: 'urgent',
    referralPriority: 'Urgent',
    reviewRecommended: true,
    findings: [
      {
        id: 'hemorrhages',
        name: 'Extensive Hemorrhages (4-quadrant)',
        status: 'Detected',
        confidence: 94.5,
        explanation: 'Dense intraretinal blot hemorrhages spanning all four quadrants (>20 per quadrant).',
      },
      {
        id: 'cotton_wool',
        name: 'Cotton Wool Spots',
        status: 'Detected',
        confidence: 92.1,
        explanation: 'Multiple nerve fiber layer infarcts indicating severe microvascular ischemia.',
      },
      {
        id: 'vessel',
        name: 'Venous Beading & Loops',
        status: 'Detected',
        confidence: 90.8,
        explanation: 'Marked venous caliber variation and loops in superior arcade.',
      },
    ],
    lesions: [
      {
        id: 'sev-1',
        type: 'hemorrhage',
        label: 'Extensive 4-Quadrant Blot Hemorrhage',
        x: 54,
        y: 33,
        size: 45,
        severity: 'high',
        description: 'Severe intraretinal capillary decompensation.',
      },
      {
        id: 'sev-2',
        type: 'cotton_wool',
        label: 'Cotton Wool Spot (Axoplasmic Infarction)',
        x: 47,
        y: 37,
        size: 35,
        severity: 'high',
        description: 'Localized retinal ischemia from precapillary arteriolar occlusion.',
      },
    ],
    recommendation: 'Urgent referral for comprehensive evaluation and possible panretinal photocoagulation (PRP) / anti-VEGF therapy within 1-2 weeks.',
    workerName: 'Anil Deshmukh',
    workerRole: 'Senior Community Ophthalmic Technician',
    campId: 'camp-1',
    campName: 'Village Health Center - Ramnagar',
    syncStatus: 'synced',
    referralStatus: 'Referral Created',
  },
];

export const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    id: 'REF-101',
    screeningId: 'SCR-903',
    patientId: 'P-20396',
    patientName: 'Mohammed Ali',
    patientAge: 58,
    patientGender: 'Male',
    patientPhone: '+91 97412 55431',
    severity: 'Severe NPDR',
    confidence: 91.4,
    priority: 'Urgent',
    status: 'Urgent',
    referralDate: 'Today (Aug 30, 2026)',
    referredToCenter: 'District Civil Hospital Eye Dept. (Solapur)',
    clinicalNotes: 'Severe NPDR with marked 4-quadrant hemorrhages and venous beading. Patient reports progressive vision reduction in left eye.',
    transportAssistanceRequired: true,
    followUpDate: '2026-09-06',
    assignedSpecialist: 'Dr. Vivek Kulkarni, Retinal Specialist',
  },
  {
    id: 'REF-102',
    screeningId: 'SCR-901',
    patientId: 'P-20394',
    patientName: 'Ravi Kumar',
    patientAge: 52,
    patientGender: 'Male',
    patientPhone: '+91 98450 23145',
    severity: 'Moderate NPDR',
    confidence: 94.7,
    priority: 'Recommended',
    status: 'Recommended',
    referralDate: '2 days ago (Aug 28, 2026)',
    referredToCenter: 'Community Health Centre - Taluka Hospital',
    clinicalNotes: 'Moderate DR with multiple microaneurysms and blot hemorrhages along temporal arcade. Macula clear on current field scan.',
    transportAssistanceRequired: false,
    followUpDate: '2026-09-20',
    assignedSpecialist: 'Dr. S. Mehra, Ophthalmic Surgeon',
  },
  {
    id: 'REF-103',
    screeningId: 'SCR-880',
    patientId: 'P-20398',
    patientName: 'Anand Patil',
    patientAge: 67,
    patientGender: 'Male',
    patientPhone: '+91 98860 11984',
    severity: 'Moderate NPDR',
    confidence: 95.1,
    priority: 'Recommended',
    status: 'Completed',
    referralDate: 'Aug 20, 2026',
    referredToCenter: 'District Civil Hospital Eye Dept.',
    clinicalNotes: 'Follow-up post laser review completed. Patient advised tight HbA1c control and re-screening in 6 months.',
    transportAssistanceRequired: false,
    followUpDate: '2027-02-20',
    assignedSpecialist: 'Dr. Vivek Kulkarni',
  },
];

export const INITIAL_CAMPS: ScreeningCamp[] = [
  {
    id: 'camp-1',
    name: "Today's Camp: Village Health Center",
    location: 'Ramnagar Primary Health Sub-Center',
    district: 'Solapur District',
    date: '30 Aug 2026 (Active)',
    targetPatients: 30,
    screenedCount: 24,
    pendingReviewCount: 6,
    moderateRiskCount: 4,
    highRiskCount: 2,
    referralsGenerated: 5,
    status: 'Active',
    leadWorker: 'Anil Deshmukh',
    syncState: 'all_synced',
    pendingSyncCount: 0,
  },
  {
    id: 'camp-2',
    name: 'Devgarh Gram Panchayat Outreach',
    location: 'Community Hall, Devgarh Village',
    district: 'Solapur District',
    date: '28 Aug 2026',
    targetPatients: 40,
    screenedCount: 38,
    pendingReviewCount: 0,
    moderateRiskCount: 7,
    highRiskCount: 3,
    referralsGenerated: 9,
    status: 'Completed',
    leadWorker: 'Anil Deshmukh & Meena R.',
    syncState: 'all_synced',
    pendingSyncCount: 0,
  },
  {
    id: 'camp-3',
    name: 'Chandrapur Tribal Health Camp',
    location: 'Sub-District Outreach Center, Chandrapur',
    district: 'Osmanabad District',
    date: '02 Sep 2026',
    targetPatients: 50,
    screenedCount: 0,
    pendingReviewCount: 0,
    moderateRiskCount: 0,
    highRiskCount: 0,
    referralsGenerated: 0,
    status: 'Upcoming',
    leadWorker: 'Anil Deshmukh',
    syncState: 'all_synced',
    pendingSyncCount: 0,
  },
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'edu-1',
    title: 'What is Diabetic Retinopathy?',
    category: 'Fundamentals',
    readTime: '3 min read',
    summary: 'Understanding the microvascular complications of diabetes in the retina.',
    imageUrl: SAMPLE_FUNDUS_IMAGES.moderate,
    badge: 'Core Clinical Guide',
    keyTakeaways: [
      'Chronically elevated blood glucose damages delicate retinal microcapillaries.',
      'Early stages are completely asymptomatic, making regular screening vital to prevent irreversible blindness.',
      'Timely detection and referral can prevent up to 90% of severe vision loss.',
    ],
    content: [
      'Diabetic retinopathy is a microvascular complication of diabetes mellitus. Persistent hyperglycemia leads to endothelial cell damage, capillary basement membrane thickening, and loss of pericytes.',
      'This microvascular damage results in two main pathological mechanisms: retinal ischemia due to capillary non-perfusion, and increased vascular permeability leading to retinal edema and lipid exudation.',
      'Because the retina lacks pain fibers, patients frequently experience zero visual symptoms during the mild and moderate non-proliferative phases. By the time vision is noticeably blurred, irreversible retinal damage or macular edema may have already occurred.',
    ],
  },
  {
    id: 'edu-2',
    title: 'How DR Progresses: The ICDR Grading Scale',
    category: 'Grading',
    readTime: '4 min read',
    summary: 'The 5 clinical stages from No DR to Proliferative Diabetic Retinopathy.',
    imageUrl: SAMPLE_FUNDUS_IMAGES.severe,
    badge: 'Grading Protocol',
    keyTakeaways: [
      'Stage 0: No apparent retinopathy.',
      'Stage 1 (Mild NPDR): Microaneurysms only.',
      'Stage 2 (Moderate NPDR): Microaneurysms + intraretinal hemorrhages or hard exudates.',
      'Stage 3 (Severe NPDR): 4-2-1 Rule (severe hemorrhages in 4 quadrants, venous beading in 2+, IRMA in 1+).',
      'Stage 4 (PDR): Active neovascularization or vitreous hemorrhage.',
    ],
    content: [
      'The International Clinical Disease Severity Scale for Diabetic Retinopathy (ICDR) standardizes classification worldwide for tele-screening and field programs.',
      'Mild NPDR is marked solely by the presence of microaneurysms—tiny outpouchings in the capillary wall appearing as sharp red dots.',
      'Moderate NPDR shows progression to flame and blot hemorrhages, hard lipid exudates, or cotton wool spots. The risk of progression increases significantly.',
      'Severe NPDR represents imminent risk of proliferative disease and must be expedited for specialist evaluation.',
    ],
  },
  {
    id: 'edu-3',
    title: 'What Should a Healthy Retina Look Like?',
    category: 'Fundamentals',
    readTime: '2 min read',
    summary: 'Normal landmarks: Optic disc, vascular arcades, macula, and foveal avascular zone.',
    imageUrl: SAMPLE_FUNDUS_IMAGES.normal,
    badge: 'Anatomy Reference',
    keyTakeaways: [
      'Optic Disc: Sharp margins, pinkish-orange rim with central pale cup (C/D ratio < 0.4).',
      'Macula: Darker, circular avascular zone located temporal to the optic disc.',
      'Vascular Arcades: Smooth, continuous vessels without abrupt caliber changes or leakages.',
    ],
    content: [
      'When reviewing a fundus photograph, first locate the optic disc. It is typically round or vertically oval, with well-defined margins and a healthy neural rim.',
      'Follow the superior and inferior vascular arcades branching from the disc. Healthy arteries appear slightly brighter and thinner than veins (A/V ratio approx 2:3).',
      'Observe the macula located roughly two disc-diameters temporally. The center (fovea centralis) should have a dark, clean appearance without lipid rings or cysts.',
    ],
  },
  {
    id: 'edu-4',
    title: 'Common Retinal Lesions in the Field',
    category: 'Field Imaging',
    readTime: '4 min read',
    summary: 'Recognizing microaneurysms, blot hemorrhages, hard exudates, and cotton wool spots.',
    imageUrl: SAMPLE_FUNDUS_IMAGES.moderate,
    badge: 'Diagnostic Clues',
    keyTakeaways: [
      'Microaneurysms: Tiny, discrete red dots < 125µm in diameter.',
      'Blot Hemorrhages: Larger, irregular red patches in deep retinal layers.',
      'Hard Exudates: Distinct, sharp-bordered, yellowish-white waxy lipid deposits.',
      'Cotton Wool Spots: Feathery, soft, fluffy whitish patches with indistinct borders.',
    ],
    content: [
      'Microaneurysms are the earliest clinically visible sign of DR. They are punctate red lesions that can easily be confused with small dot hemorrhages.',
      'Hard exudates are composed of lipoprotein deposits left behind when plasma leaks from abnormal vessels. When they form a complete ring (circinate ring), suspect a leaking microaneurysm cluster in the center.',
      'Cotton wool spots (soft exudates) are not true exudates; they are localized axoplasmic flow blockages caused by retinal arteriolar occlusion.',
    ],
  },
  {
    id: 'edu-5',
    title: 'How to Capture a High-Quality Retinal Photograph in the Field',
    category: 'Field Imaging',
    readTime: '3 min read',
    summary: 'Technician best practices for handheld fundus scopes and smartphone adapters.',
    imageUrl: SAMPLE_FUNDUS_IMAGES.normal,
    badge: 'Technique Best Practice',
    keyTakeaways: [
      'Darken the environment or use a rubber eyecup to allow natural physiological pupil dilation.',
      'Instruct patient to fixate steadily on the internal fixation LED target.',
      'Maintain steady working distance (typically 15-20mm) to prevent rim glare and crescent artifacts.',
      'Always verify disc and macula are centered before completing the capture.',
    ],
    content: [
      'In non-mydriatic screening camps where dilating eye drops are not used, patient positioning and ambient lighting are paramount.',
      'Ensure the patient is seated comfortably. Have them blink twice, open wide, and focus steadily on the target light.',
      'Align the illumination beam with the pupil center. If you see a bright crescent shadow on the side, move slightly towards the center of the pupil.',
      'Immediately inspect the captured preview on the tablet: if focus is soft or disc is cut off, retake before the patient leaves the screening station.',
    ],
  },
];
