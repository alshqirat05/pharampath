import { NextResponse } from 'next/server';
import {
  ASSISTANT_SYSTEM_PROMPT,
  MANDATORY_DISCLAIMER,
} from '@/server/assistantSystemPrompt';

const SAMPLE_KNOWLEDGE_BASE = [
  {
    keywords: ['ميتفورمين', 'metformin', 'كلى', 'renal', 'egfr', 'lactic'],
    reply: {
      ar: 'الميتفورمين (Biguanide) يقلل استحداث الجلوكوز في الكبد ويحسّن حساسية الخلايا الطرفية للأنسولين دون تحفيز إفراز الأنسولين مباشرة. يُطرح الدواء دون تغيير عبر الكلى؛ لذا فإن انخفاض معدل الترشيح الكبيبي (eGFR < 30 mL/min/1.73m²) يُعد مانع استعمال وفق النشرات المرجعية لتجنب خطر الحماض اللاكتيكي.',
      en: 'Metformin (a biguanide) reduces hepatic gluconeogenesis and improves peripheral insulin sensitivity without directly stimulating insulin release. Because it is cleared unchanged renally, severe renal impairment (eGFR < 30 mL/min/1.73m²) is a contraindication due to lactic acidosis risk.',
    },
    references: [
      { title: 'DailyMed — Metformin Official Label', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
      { title: 'JFDA — المؤسسة العامة للغذاء والدواء', url: 'https://www.jfda.jo/' },
    ],
  },
  {
    keywords: ['سيبروفلوكساسين', 'ciprofloxacin', 'كالسيوم', 'حديد', 'calcium', 'iron', 'كينولون'],
    reply: {
      ar: 'تتفاعل المضادات الحيوية من فئة الفلوروكينولون (مثل السيبروفلوكساسين) في الأمعاء مع الأيونات ثنائية وثلاثية التكافؤ (الكالسيوم، الحديد، المغنيسيوم، الزنك، ومضادات الحموضة) مكوّنة مركبات مخلبية غير قابلة للامتصاص، مما يضعف فعالية العلاج. يُنصح تعليمياً بتناول الدواء قبل ساعتين أو بعد 6 ساعات من هذه المكملات.',
      en: 'Fluoroquinolones (such as ciprofloxacin) form insoluble chelation complexes in the GI tract with divalent and trivalent cations (calcium, iron, magnesium, aluminum antacids), markedly reducing oral absorption. Separate dosing by 2 hours before or 6 hours after supplements.',
    },
    references: [
      { title: 'MedlinePlus — Drug Information', url: 'https://medlineplus.gov/druginformation.html' },
      { title: 'DailyMed — Ciprofloxacin Labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
    ],
  },
  {
    keywords: ['وارفارين', 'warfarin', 'تداخل', 'interaction', 'inr', 'cyp'],
    reply: {
      ar: 'الوارفارين مضاد تخثر يعمل عبر تثبيط اختزال فيتامين K (VKORC1). يمتلك نافذة علاجية ضيقة ويُستقلب أساساً عبر إنزيم الكبد CYP2C9؛ لذلك ترفع مثبطات هذا الإنزيم (مثل الميترونيدازول) قيمة INR وخطر النزيف، بينما تقلل المحفزات (مثل الريفامبيسين) فعاليته.',
      en: 'Warfarin inhibits vitamin K epoxide reductase (VKORC1). It has a narrow therapeutic index and undergoes hepatic metabolism primarily via CYP2C9. Enzyme inhibitors (e.g., metronidazole) elevate INR and bleeding risk, whereas inducers (e.g., rifampin) reduce anticoagulant effect.',
    },
    references: [
      { title: 'DailyMed — Warfarin Prescribing Info', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
      { title: 'MedlinePlus — Drug Interactions', url: 'https://medlineplus.gov/druginformation.html' },
    ],
  },
  {
    keywords: ['مضاد', 'antibiotic', 'اموكسيسيلين', 'amoxicillin', 'بيتالاكتام', 'lactam'],
    reply: {
      ar: 'مضادات البيتالاكتام (مثل الأموكسيسيلين والسيفالوسبورينات) تثبط تصنيع جدار الخلية البكتيرية عبر الارتباط ببروتينات PBP. يعتمد نشاطها القاتل للبكتيريا على الزمن الذي يبقى فيه تركيز الدواء الحر فوق التركيز المثبط الأدنى (fT > MIC)، مما يجعل انتظام فترات الجرعات ضرورياً.',
      en: 'Beta-lactam antibiotics (such as amoxicillin and cephalosporins) inhibit bacterial cell-wall synthesis by binding penicillin-binding proteins (PBPs). Their bactericidal activity is time-dependent (fT > MIC), making consistent dosing intervals essential.',
    },
    references: [
      { title: 'WHO Essential Medicines List (eEML)', url: 'https://list.essentialmeds.org/' },
      { title: 'PubMed — Clinical Literature', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
  },
];

const DEFAULT_EDUCATIONAL_REPLY = {
  ar: 'لتحليل أي سؤال دوائي بطريقة منهجية أثناء التدريب الصيدلاني، راجع أربع نقاط أساسية: (1) الفئة الدوائية وآلية العمل، (2) مسار الاستقلاب والإطراح الكلوي أو الكبدي، (3) التداخلات الدوائية والغذائية المهمة سريرياً، و(4) إرشادات الاستخدام الآمن في النشرات المعتمدة أدناه.',
  en: 'To evaluate any drug-information question systematically during pharmacy training, check four pillars: (1) pharmacological class and mechanism, (2) renal/hepatic clearance pathway, (3) clinically significant interactions, and (4) counseling points in the verified sources below.',
};

const DEFAULT_REFERENCES = [
  { title: 'DailyMed (NIH Official Drug Labels)', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
  { title: 'JFDA (Jordan Food & Drug Administration)', url: 'https://www.jfda.jo/' },
  { title: 'WHO Essential Medicines List (eEML)', url: 'https://list.essentialmeds.org/' },
];

export async function handleAssistantPost(request) {
  try {
    const body = await request.json();
    const message = String(body?.message || '').trim();
    const lang = body?.language === 'en' ? 'en' : 'ar';

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // [LLM INTEGRATION POINT — PLUG IN LIVE LLM CALL HERE USING ASSISTANT_SYSTEM_PROMPT]
    void ASSISTANT_SYSTEM_PROMPT;

    const normalized = message.toLowerCase();
    const matchedTopic = SAMPLE_KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((kw) => normalized.includes(kw))
    );

    return NextResponse.json({
      reply: matchedTopic ? matchedTopic.reply[lang] : DEFAULT_EDUCATIONAL_REPLY[lang],
      references: matchedTopic ? matchedTopic.references : DEFAULT_REFERENCES,
      disclaimer: MANDATORY_DISCLAIMER[lang],
      isSampleMode: true,
    });
  } catch {
    return NextResponse.json({ error: 'Unable to process query' }, { status: 500 });
  }
}
