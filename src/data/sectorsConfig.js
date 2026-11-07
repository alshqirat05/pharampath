/**
 * Canonical definitions for the 4 pharmacy training sectors, cities,
 * working hours, and areas of professional interest.
 * Uses the Ottawa Falls (#00a78e) palette with a subtle touch of Nahdi rose (#d6336c).
 */

export const SECTORS = [
  {
    id: 'community',
    index: '01',
    badgeClass: 'bg-[#ccede8] text-[#004339] border-[#99dcd2]',
    activePillClass: 'bg-[#00a78e] text-white border-[#00a78e] shadow-xs',
    glareColor: 'rgba(0, 167, 142, 0.12)',
    dotClass: 'bg-[#00a78e]',
    label: { ar: 'صيدليات المجتمع', en: 'Community Pharmacies' },
    shortLabel: { ar: 'صيدلية مجتمع', en: 'Community' },
    oneLiner: {
      ar: 'الإرشاد الدوائي المباشر، صرف الوصفات الطبية، ومتابعة علاج المرضى اليومي.',
      en: 'Direct patient counseling, prescription verification, and everyday primary care.',
    },
  },
  {
    id: 'hospital',
    index: '02',
    badgeClass: 'bg-[#fce7f3] text-[#9c1c47] border-[#fbcfe8]',
    activePillClass: 'bg-[#d6336c] text-white border-[#d6336c] shadow-xs',
    glareColor: 'rgba(214, 51, 108, 0.1)',
    dotClass: 'bg-[#d6336c]',
    label: { ar: 'المستشفيات', en: 'Hospitals' },
    shortLabel: { ar: 'مستشفيات', en: 'Hospital' },
    oneLiner: {
      ar: 'الجولات السريرية في الأقسام، مراجعة البروتوكولات العلاجية، وتحضير المحاليل الوريدية.',
      en: 'Inpatient clinical rounds, pharmacotherapy review, and sterile IV compounding.',
    },
  },
  {
    id: 'company',
    index: '03',
    badgeClass: 'bg-[#ccede8] text-[#004339] border-[#99dcd2]',
    activePillClass: 'bg-[#008672] text-white border-[#008672] shadow-xs',
    glareColor: 'rgba(0, 134, 114, 0.12)',
    dotClass: 'bg-[#008672]',
    label: { ar: 'الشركات الدوائية', en: 'Pharmaceutical Companies' },
    shortLabel: { ar: 'شركات دوائية', en: 'Company' },
    oneLiner: {
      ar: 'الشؤون التنظيمية وتسجيل الدواء، التيقظ الدوائي، والمكتب العلمي الطبي.',
      en: 'Regulatory affairs, pharmacovigilance safety reporting, and medical affairs.',
    },
  },
  {
    id: 'factory',
    index: '04',
    badgeClass: 'bg-[#ccede8]/70 text-[#00211c] border-[#66cabb]',
    activePillClass: 'bg-[#004339] text-white border-[#004339] shadow-xs',
    glareColor: 'rgba(0, 67, 57, 0.12)',
    dotClass: 'bg-[#004339]',
    label: { ar: 'المصانع الدوائية', en: 'Pharmaceutical Factories' },
    shortLabel: { ar: 'مصانع دوائية', en: 'Factory' },
    oneLiner: {
      ar: 'خطوط التصنيع الجيد (GMP)، مختبرات الرقابة النوعية (QC)، وتطوير الصيغ الصيدلانية.',
      en: 'cGMP manufacturing lines, analytical QC laboratories, and formulation R&D.',
    },
  },
];

export const SECTOR_BY_ID = Object.fromEntries(SECTORS.map((s) => [s.id, s]));

export function getSectorById(id) {
  return SECTOR_BY_ID[id] || SECTORS[0];
}

export const CITIES = [
  { id: 'amman', ar: 'عمّان', en: 'Amman', label: { ar: 'عمّان', en: 'Amman' } },
  { id: 'irbid', ar: 'إربد', en: 'Irbid', label: { ar: 'إربد', en: 'Irbid' } },
  { id: 'zarqa', ar: 'الزرقاء', en: 'Zarqa', label: { ar: 'الزرقاء', en: 'Zarqa' } },
  { id: 'salt', ar: 'السلط', en: 'Al-Salt', label: { ar: 'السلط', en: 'Al-Salt' } },
  { id: 'aqaba', ar: 'العقبة', en: 'Aqaba', label: { ar: 'العقبة', en: 'Aqaba' } },
  { id: 'madaba', ar: 'مادبا', en: 'Madaba', label: { ar: 'مادبا', en: 'Madaba' } },
];

export function getCityById(id) {
  return CITIES.find((c) => c.id === id) || null;
}

export const WORKING_HOURS_OPTIONS = [
  { id: 'morning', ar: 'دوام صباحي', en: 'Morning Shift', label: { ar: 'دوام صباحي', en: 'Morning Shift' } },
  { id: 'evening', ar: 'دوام مسائي', en: 'Evening Shift', label: { ar: 'دوام مسائي', en: 'Evening Shift' } },
  { id: 'flexible', ar: 'ساعات مرنة', en: 'Flexible Hours', label: { ar: 'ساعات مرنة', en: 'Flexible Hours' } },
];

export const PROFESSIONAL_INTERESTS = [
  { id: 'counseling', ar: 'الإرشاد الدوائي وصرف الوصفات', en: 'Patient Counseling & Dispensing' },
  { id: 'clinical', ar: 'الصيدلة السريرية والمستشفيات', en: 'Clinical & Hospital Pharmacy' },
  { id: 'regulatory', ar: 'الشؤون التنظيمية والتيقظ الدوائي', en: 'Regulatory Affairs & Pharmacovigilance' },
  { id: 'quality', ar: 'ضمان الجودة والتصنيع الجيد (QA/QC)', en: 'Quality Assurance & cGMP (QA/QC)' },
  { id: 'compounding', ar: 'التحضير الصيدلاني والمحاليل المعقمة', en: 'Sterile & Non-Sterile Compounding' },
];
