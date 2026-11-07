/**
 * Sample starter questions and interactive Q&A previews for the
 * Educational Drug Information Assistant.
 */

export const STARTER_PROMPTS = {
  ar: [
    'ما هي آلية عمل الميتفورمين ومتى ننتبه لوظائف الكلى؟',
    'كيف أوضح التداخل بين السيبروفلوكساسين ومكملات الكالسيوم والحديد؟',
    'كيف تؤثر تداخلات الوارفارين على فحص INR؟',
    'ما هي آلية عمل مضادات البيتالاكتام وأهمية تنظيم أوقات الجرعات؟',
  ],
  en: [
    'What is the mechanism of Metformin and why is renal function monitored?',
    'How does Ciprofloxacin interact with calcium and iron supplements?',
    'How do Warfarin CYP2C9 interactions affect INR monitoring?',
    'How do beta-lactam antibiotics work and why does dosing interval matter?',
  ],
};

export const DEMO_QA = {
  ar: [
    {
      question: 'ما هي آلية عمل الميتفورمين ولماذا نراقب وظائف الكلى (eGFR)؟',
      answer:
        'يعمل الميتفورمين على تقليل إنتاج الجلوكوز في الكبد وتحسين حساسية الخلايا للأنسولين دون تحفيز البنكرياس مباشرة. وبما أنه يُطرح عن طريق الكلى دون استقلاب، فإن انخفاض eGFR دون 30 مل/دقيقة يُعد مانع استعمال لتفادي خطر الحماض اللاكتيكي.',
      references: [
        { name: 'DailyMed — NIH', url: 'https://dailymed.nlm.nih.gov/' },
        { name: 'المؤسسة العامة للغذاء والدواء JFDA', url: 'https://www.jfda.jo/' },
      ],
    },
    {
      question: 'كيف أوضح للمريض التداخل الدوائي بين السيبروفلوكساسين ومكملات الكالسيوم أو الحديد؟',
      answer:
        'ترتبط مضادات الكينولون بالأيونات ثنائية وثلاثية التكافؤ (مثل الكالسيوم، الحديد، والمغنيسيوم) في الجهاز الهضمي مكوّنة مركبات مخلبية غير قابلة للامتصاص، مما يقلل فعالية المضاد الحيوي. يُنصح بالفصل الزمني بساعتين قبل أو 6 ساعات بعد المكمل.',
      references: [
        { name: 'MedlinePlus Drug Info', url: 'https://medlineplus.gov/druginformation.html' },
        { name: 'DailyMed Labeling', url: 'https://dailymed.nlm.nih.gov/' },
      ],
    },
    {
      question: 'لماذا يُراقب فحص INR بانتظام عند استخدام دواء الوارفارين؟',
      answer:
        'يتميز الوارفارين بنافذة علاجية ضيقة ويُستقلب عبر إنزيم CYP2C9 الكبدي؛ لذا فإن العديد من الأدوية والأغذية الغنية بفيتامين K تغيّر تركيزه الفعال في الدم، مما يستوجب متابعة INR للوقاية من النزيف أو التجلط.',
      references: [
        { name: 'DailyMed — Warfarin', url: 'https://dailymed.nlm.nih.gov/' },
        { name: 'WHO Essential Medicines', url: 'https://list.essentialmeds.org/' },
      ],
    },
  ],
  en: [
    {
      question: 'What is the mechanism of Metformin and why is eGFR monitored?',
      answer:
        'Metformin decreases hepatic gluconeogenesis and improves peripheral insulin sensitivity without directly stimulating insulin release. Because it is excreted unchanged renally, eGFR < 30 mL/min/1.73m² is a contraindication due to lactic acidosis risk.',
      references: [
        { name: 'DailyMed — NIH', url: 'https://dailymed.nlm.nih.gov/' },
        { name: 'JFDA Drug Portal', url: 'https://www.jfda.jo/' },
      ],
    },
    {
      question: 'How do I explain the Ciprofloxacin interaction with calcium or iron supplements?',
      answer:
        'Fluoroquinolones form insoluble chelation complexes in the gut with divalent and trivalent cations (Ca²⁺, Fe²⁺, Mg²⁺), markedly reducing oral bioavailability. Separate administration by 2 hours before or 6 hours after cation products.',
      references: [
        { name: 'MedlinePlus Drug Info', url: 'https://medlineplus.gov/druginformation.html' },
        { name: 'DailyMed Labeling', url: 'https://dailymed.nlm.nih.gov/' },
      ],
    },
    {
      question: 'Why does Warfarin therapy require close INR monitoring?',
      answer:
        'Warfarin has a narrow therapeutic index and undergoes hepatic CYP2C9 metabolism. Enzyme inhibitors, inducers, and dietary vitamin K shifts can markedly alter anticoagulation intensity, requiring regular INR checks.',
      references: [
        { name: 'DailyMed — Warfarin', url: 'https://dailymed.nlm.nih.gov/' },
        { name: 'WHO Essential Medicines', url: 'https://list.essentialmeds.org/' },
      ],
    },
  ],
};

