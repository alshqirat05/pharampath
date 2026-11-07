/**
 * SAMPLE DATA ONLY — Clearly flagged per client brief.
 * Contains no real institution claims, no personal contact data, and no invented statistics.
 * Covers the 4 required pharmaceutical training sectors:
 * - community (Community Pharmacies)
 * - hospital (Hospitals)
 * - company (Pharmaceutical Companies)
 * - factory (Pharmaceutical Factories / Manufacturing)
 */

export const opportunitiesSample = [
  {
    id: 'opp-community-amman-01',
    sector: 'community',
    city: 'amman',
    availablePositions: 3,
    workingHours: 'morning',
    availableDates: { from: '2025-06-01', to: '2025-08-31' },
    interest: 'counseling',
    title: { ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات', en: 'Community Pharmacy Training — Patient Counseling & Dispensing' },
    organization: { ar: 'صيدلية المجتمع التعليمي — فرع عمّان الغربي (بيانات تجريبية)', en: 'Educational Community Pharmacy — West Amman Branch (Sample Data)' },
    locationDetail: { ar: 'عمّان — شارع المدينة المنورة', en: 'Amman — Mecca & Medina Street Corridor' },
    schedule: { ar: 'الأحد – الخميس | 08:30 صباحاً – 02:30 ظهراً (6 ساعات يومياً)', en: 'Sun – Thu | 08:30 AM – 02:30 PM (6 hours/day)' },
    requirements: {
      ar: ['إتمام مساق علم الأدوية (1) بنجاح', 'الالتزام بأخلاقيات السرية المهنية للمرضى', 'إحضار كتاب التدريب الميداني الرسمي من الكلية'],
      en: ['Successful completion of Pharmacology I', 'Strict adherence to patient confidentiality ethics', 'Official faculty field-training logbook'],
    },
    summary: {
      ar: 'برنامج تدريبي عملي يركز على قراءة الوصفات الطبية، التحقق من الجرعات والتداخلات الدوائية، وتقديم المشورة الصيدلانية الآمنة للمرضى.',
      en: 'Hands-on training focused on prescription verification, dosage and interaction checks, OTC triage, and structured patient counseling.',
    },
    contact: {
      coordinator: { ar: 'قسم الإشراف التدريبي — صيدليات المجتمع', en: 'Community Training Supervision Desk' },
      email: 'community.training.sample@pharmapath.edu.jo',
      phone: '+962 6 550 0101',
    },
  },
  {
    id: 'opp-hospital-amman-02',
    sector: 'hospital',
    city: 'amman',
    availablePositions: 2,
    workingHours: 'morning',
    availableDates: { from: '2025-06-15', to: '2025-09-15' },
    interest: 'clinical',
    title: { ar: 'تدريب صيدلة المستشفيات والصيدلة السريرية', en: 'Hospital & Clinical Pharmacy Rotational Training' },
    organization: { ar: 'المستشفى التعليمي التخصصي — قسم الصيدلة الداخلية (بيانات تجريبية)', en: 'Specialty Teaching Hospital — Inpatient Pharmacy Dept. (Sample Data)' },
    locationDetail: { ar: 'عمّان — منطقة الجبيهة', en: 'Amman — Al-Jubeiha District' },
    schedule: { ar: 'الأحد – الخميس | 08:00 صباحاً – 03:00 عصراً', en: 'Sun – Thu | 08:00 AM – 03:00 PM' },
    requirements: {
      ar: ['طالب سنة رابعة أو خامسة في كلية الصيدلة', 'إتمام مساق الصيدلة السريرية أو المداواة (1)', 'الالتزام ببروتوكول مكافحة العدوى داخل المستشفى'],
      en: ['4th or 5th year pharmacy student', 'Completion of Clinical Pharmacy or Pharmacotherapy I', 'Compliance with hospital infection-control protocols'],
    },
    summary: {
      ar: 'دوران تدريبي يشمل صيدلية الأقسام الداخلية، تحضير المحاليل الوريدية المعقمة، ومرافقة الصيدلاني السريري في الجولات الصباحية لمراجعة الملفات الدوائية.',
      en: 'Rotational exposure covering unit-dose inpatient dispensing, sterile IV admixture preparation, and morning clinical pharmacotherapy rounds.',
    },
    contact: {
      coordinator: { ar: 'مكتب تنسيق التدريب السريري للمستشفيات', en: 'Hospital Clinical Training Coordination Office' },
      email: 'hospital.rotations.sample@pharmapath.edu.jo',
      phone: '+962 6 550 0102',
    },
  },
  {
    id: 'opp-company-amman-03',
    sector: 'company',
    city: 'amman',
    availablePositions: 4,
    workingHours: 'flexible',
    availableDates: { from: '2025-07-01', to: '2025-09-30' },
    interest: 'regulatory',
    title: { ar: 'تدريب الشؤون التنظيمية والتيقظ الدوائي', en: 'Regulatory Affairs & Pharmacovigilance Internship' },
    organization: { ar: 'المكتب العلمي الدوائي الإقليمي (بيانات تجريبية)', en: 'Regional Pharmaceutical Scientific Office (Sample Data)' },
    locationDetail: { ar: 'عمّان — الشميساني', en: 'Amman — Shmeisani Business District' },
    schedule: { ar: 'الأحد – الخميس | ساعات مرنة (09:00 صباحاً – 03:00 عصراً)', en: 'Sun – Thu | Flexible Hours (09:00 AM – 03:00 PM)' },
    requirements: {
      ar: ['إجادة اللغة الإنجليزية العلمية قراءةً وكتابةً', 'معرفة أساسية بمتطلبات ملف التسجيل الدوائي (CTD)', 'مهارات البحث في المراجع الدوائية المعتمدة'],
      en: ['Strong proficiency in scientific English writing', 'Foundational familiarity with CTD dossier structure', 'Ability to search official regulatory databases'],
    },
    summary: {
      ar: 'تدريب مكتبي متخصص في إعداد ملفات التسجيل الدوائي، مراجعة النشرات الداخلية، ومتابعة تقارير السلامة الدوائية وفق المعايير التنظيمية.',
      en: 'Structured internship covering CTD regulatory dossier compilation, package insert verification, and pharmacovigilance case-safety reporting.',
    },
    contact: {
      coordinator: { ar: 'منسق التدريب الأكاديمي — الشؤون التنظيمية', en: 'Academic Regulatory Training Coordinator' },
      email: 'regulatory.office.sample@pharmapath.edu.jo',
      phone: '+962 6 550 0103',
    },
  },
  {
    id: 'opp-factory-salt-04',
    sector: 'factory',
    city: 'salt',
    availablePositions: 3,
    workingHours: 'morning',
    availableDates: { from: '2025-06-10', to: '2025-08-25' },
    interest: 'quality',
    title: { ar: 'تدريب ضمان الجودة (QA) وممارسات التصنيع الجيد (GMP)', en: 'Quality Assurance (QA) & cGMP Manufacturing Training' },
    organization: { ar: 'مصنع المستحضرات الصيدلانية المتقدمة (بيانات تجريبية)', en: 'Advanced Pharmaceutical Manufacturing Plant (Sample Data)' },
    locationDetail: { ar: 'السلط — المنطقة الصناعية الدوائية', en: 'Al-Salt — Pharmaceutical Industrial Zone' },
    schedule: { ar: 'الأحد – الخميس | 08:00 صباحاً – 02:30 ظهراً', en: 'Sun – Thu | 08:00 AM – 02:30 PM' },
    requirements: {
      ar: ['إتمام مساق الصيدلانيات الصناعية والتحليل الآلي', 'الالتزام الكامل بلباس السلامة المخبرية داخل خطوط الإنتاج', 'المتابعة الحضورية المنتظمة طوال فترة التدريب'],
      en: ['Completion of Industrial Pharmacy & Instrumental Analysis', 'Strict adherence to cleanroom & laboratory PPE standards', 'Full on-site attendance throughout the rotation'],
    },
    summary: {
      ar: 'يتعرف المتدرب على خطوط إنتاج الأشكال الصيدلانية الصلبة، فحوصات الرقابة النوعية (QC) مثل فحص الذوبانية وHPLC، وتوثيق سجلات التشغيل الدوائية.',
      en: 'Covers solid-dosage production lines, in-process quality control (dissolution, HPLC assay testing), and batch manufacturing record documentation.',
    },
    contact: {
      coordinator: { ar: 'إدارة التدريب الصناعي وضمان الجودة', en: 'Industrial QA/QC Training Department' },
      email: 'factory.gmp.sample@pharmapath.edu.jo',
      phone: '+962 5 350 0104',
    },
  },
  {
    id: 'opp-community-irbid-05',
    sector: 'community',
    city: 'irbid',
    availablePositions: 2,
    workingHours: 'evening',
    availableDates: { from: '2025-06-15', to: '2025-09-01' },
    interest: 'counseling',
    title: { ar: 'تدريب مسائي — إدارة الأمراض المزمنة في صيدلية المجتمع', en: 'Evening Community Rotation — Chronic Disease Medication Care' },
    organization: { ar: 'صيدلية الشمال التعليمية (بيانات تجريبية)', en: 'Northern Educational Community Pharmacy (Sample Data)' },
    locationDetail: { ar: 'إربد — شارع الجامعة', en: 'Irbid — University Street' },
    schedule: { ar: 'الأحد – الخميس | 03:30 عصراً – 08:30 مساءً', en: 'Sun – Thu | 03:30 PM – 08:30 PM' },
    requirements: {
      ar: ['إتمام 80 ساعة معتمدة على الأقل في خطة الصيدلة', 'مهارات تواصل فعالة لتعليم استخدام أجهزة الاستنشاق والأنسولين'],
      en: ['Minimum 80 completed credit hours in B.Pharm/PharmD plan', 'Strong communication skills for inhaler & insulin device counseling'],
    },
    summary: {
      ar: 'يركز البرنامج المسائي على متابعة مرضى السكري وارتفاع ضغط الدم والربو، ومراجعة التزامهم الدوائي وتجنب الازدواجية العلاجية.',
      en: 'Evening schedule tailored for students with morning lectures, emphasizing diabetes, hypertension, and asthma device technique counseling.',
    },
    contact: {
      coordinator: { ar: 'مشرف التدريب الميداني — فرع إربد', en: 'Field Training Preceptor — Irbid Branch' },
      email: 'irbid.community.sample@pharmapath.edu.jo',
      phone: '+962 2 720 0105',
    },
  },
  {
    id: 'opp-hospital-zarqa-06',
    sector: 'hospital',
    city: 'zarqa',
    availablePositions: 2,
    workingHours: 'morning',
    availableDates: { from: '2025-07-01', to: '2025-09-15' },
    interest: 'compounding',
    title: { ar: 'تدريب التحضير الصيدلاني المعقم وصيدلية الطوارئ', en: 'Sterile Compounding & Emergency Pharmacy Training' },
    organization: { ar: 'مركز الرعاية السريرية بالمستشفى — الزرقاء (بيانات تجريبية)', en: 'Clinical Hospital Care Center — Zarqa (Sample Data)' },
    locationDetail: { ar: 'الزرقاء — الزرقاء الجديدة', en: 'Zarqa — New Zarqa District' },
    schedule: { ar: 'الأحد – الخميس | 08:00 صباحاً – 02:00 ظهراً', en: 'Sun – Thu | 08:00 AM – 02:00 PM' },
    requirements: {
      ar: ['اجتياز مساق الصيدلانيات والأشكال الصيدلانية المعقمة', 'الالتزام بالحسابات الصيدلانية الدقيقة للتراكيز الوريدية'],
      en: ['Completion of Sterile Dosage Forms coursework', 'Proficiency in pharmaceutical IV infusion calculations'],
    },
    summary: {
      ar: 'تدريب عملي على حسابات التغذية الوريدية، شروط الغرف المعقمة، وتدقيق أدوية الحالات الحرجة عالية الخطورة.',
      en: 'Practical training on parenteral nutrition calculations, cleanroom aseptic workflow, and high-alert emergency medication verification.',
    },
    contact: {
      coordinator: { ar: 'وحدة التدريب الصيدلاني — مستشفى الزرقاء', en: 'Hospital Pharmacy Preceptorship Unit — Zarqa' },
      email: 'zarqa.hospital.sample@pharmapath.edu.jo',
      phone: '+962 5 390 0106',
    },
  },
];

export function getOpportunityById(id) {
  return opportunitiesSample.find((opp) => opp.id === id) || null;
}
