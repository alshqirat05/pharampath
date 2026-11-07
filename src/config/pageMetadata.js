import { BRAND_NAME } from './siteConfig';
import { opportunitiesSample } from '@/data/opportunitiesSample';

export const rootMetadata = {
  title: {
    default: `${BRAND_NAME} — منصة التدريب الصيدلاني الميداني`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'منصة متخصصة لطلبة الصيدلة تجمع فرص التدريب الميداني عبر أربعة قطاعات مع مساعد تعليمي للمعلومات الدوائية ومراجع سريرية معتمدة.',
};

export const homeMetadata = {
  title: `${BRAND_NAME} — فرص التدريب الصيدلاني والمساعد الدوائي`,
  description:
    'ابحث بسهولة عن فرص التدريب الصيدلاني في صيدليات المجتمع، المستشفيات، الشركات، والمصانع الدوائية.',
};

export const opportunitiesMetadata = {
  title: 'فرص التدريب الصيدلاني',
  description:
    'تصفية ذكية لفرص التدريب الصيدلاني حسب الموقع الجغرافي، القطاع، التواريخ المتاحة، ساعات العمل، ومجال الاهتمام.',
};

export const assistantMetadata = {
  title: 'المساعد التعليمي للمعلومات الدوائية',
  description:
    'مساعد تعليمي ذكي لشرح آليات عمل الأدوية والتداخلات الدوائية وتوجيه طلبة الصيدلة إلى المراجع السريرية المعتمدة.',
};

export const referencesMetadata = {
  title: 'المراجع الدوائية والسريرية المعتمدة',
  description:
    'روابط مباشرة لمصادر معلومات الأدوية والهيئات الرقابية المعتمدة لطلبة الصيدلة.',
};

export const aboutMetadata = {
  title: 'عن المنصة ورؤيتها',
  description:
    'تعرف على أهداف ومزايا منصة PharmaPath في ربط طلبة الصيدلة بجهات التدريب الميداني والمصادر الدوائية الموثوقة.',
};

export const loginMetadata = {
  title: 'تسجيل الدخول',
};

export const registerMetadata = {
  title: 'إنشاء حساب جديد',
};

export function opportunityStaticParams() {
  return opportunitiesSample.map((item) => ({ id: item.id }));
}

export async function opportunityDetailMetadata({ params }) {
  const { id } = await params;
  const opp = opportunitiesSample.find((item) => item.id === id);
  if (!opp) {
    return { title: 'الفرصة غير موجودة' };
  }
  return {
    title: `${opp.title.ar} — ${opp.organization.ar}`,
    description: opp.summary.ar,
  };
}
