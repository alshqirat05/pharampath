/**
 * Pharmacy / Coordinator Dashboard Data & Local Persistence
 * Manages pharmacy profile, published training offers, and student applications (accept/reject).
 */

import { useMemo, useSyncExternalStore } from 'react';
import { opportunitiesSample } from './opportunitiesSample';

export const INITIAL_PHARMACY_PROFILE = {
  pharmacyName: 'صيدلية المجتمع التعليمي — فرع عمّان الغربي',
  pharmacyNameEn: 'Educational Community Pharmacy — West Amman Branch',
  coordinatorName: 'د. ليلى الحياري',
  coordinatorNameEn: 'Dr. Laila Al-Hayari',
  email: 'community.training.sample@pharmapath.edu.jo',
  phone: '+962 6 550 0101',
  city: 'amman',
  sector: 'community',
  licenseNumber: 'JFDA-TRN-2025-041',
};

export const INITIAL_PHARMACY_APPLICATIONS = [
  {
    id: 'app-201',
    studentName: 'سارة منصور الشقيرات',
    studentNameEn: 'Sara Mansour Alshqirat',
    university: { ar: 'الجامعة الأردنية — كلية الصيدلة', en: 'University of Jordan — School of Pharmacy' },
    academicYear: { ar: 'السنة الخامسة', en: '5th Year' },
    email: 'sara.student@pharmapath.edu.jo',
    phone: '+962 79 550 1120',
    opportunityId: 'opp-community-amman-01',
    opportunityTitle: {
      ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات',
      en: 'Community Pharmacy Training — Patient Counseling & Dispensing',
    },
    appliedDate: '2025-05-18',
    preferredShift: 'morning',
    note: {
      ar: 'أتممت مساق علم الأدوية (1) و(2) وأرغب بالتدريب في الإرشاد الدوائي وصرف الوصفات.',
      en: 'Completed Pharmacology I & II and eager to train in patient counseling and dispensing.',
    },
    status: 'accepted',
  },
  {
    id: 'app-202',
    studentName: 'زيد طارق العواملة',
    studentNameEn: 'Zaid Tareq Al-Awamleh',
    university: { ar: 'جامعة العلوم والتكنولوجيا الأردنية', en: 'Jordan University of Science & Technology' },
    academicYear: { ar: 'السنة الرابعة', en: '4th Year' },
    email: 'zaid.awamleh@pharmapath.edu.jo',
    phone: '+962 78 612 3409',
    opportunityId: 'opp-community-amman-01',
    opportunityTitle: {
      ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات',
      en: 'Community Pharmacy Training — Patient Counseling & Dispensing',
    },
    appliedDate: '2025-05-20',
    preferredShift: 'morning',
    note: {
      ar: 'لدي خبرة تطوعية في التثقيف الدوائي وألتزم بساعات الدوام الصباحي كاملة.',
      en: 'Volunteered in medication awareness campaigns and fully available for morning shifts.',
    },
    status: 'pending',
  },
  {
    id: 'app-203',
    studentName: 'لجين عمر الزعبي',
    studentNameEn: 'Lujain Omar Al-Zoubi',
    university: { ar: 'الجامعة الهاشمية — كلية العلوم الصيدلانية', en: 'Hashemite University — Faculty of Pharmaceutical Sciences' },
    academicYear: { ar: 'السنة الخامسة', en: '5th Year' },
    email: 'lujain.zoubi@pharmapath.edu.jo',
    phone: '+962 77 901 4455',
    opportunityId: 'opp-community-amman-01',
    opportunityTitle: {
      ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات',
      en: 'Community Pharmacy Training — Patient Counseling & Dispensing',
    },
    appliedDate: '2025-05-21',
    preferredShift: 'flexible',
    note: {
      ar: 'أبحث عن تدريب ميداني معتمد لاستكمال ساعات التخرج الصيفية.',
      en: 'Seeking accredited field training to complete summer graduation hours.',
    },
    status: 'pending',
  },
  {
    id: 'app-204',
    studentName: 'أحمد سامي الكردي',
    studentNameEn: 'Ahmad Sami Al-Kurdi',
    university: { ar: 'جامعة البترا — كلية الصيدلة', en: 'University of Petra — Faculty of Pharmacy' },
    academicYear: { ar: 'السنة الثالثة', en: '3rd Year' },
    email: 'ahmad.kurdi@pharmapath.edu.jo',
    phone: '+962 79 332 8810',
    opportunityId: 'opp-community-amman-01',
    opportunityTitle: {
      ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات',
      en: 'Community Pharmacy Training — Patient Counseling & Dispensing',
    },
    appliedDate: '2025-05-14',
    preferredShift: 'evening',
    note: {
      ar: 'متاح للفترة المسائية فقط بعد الساعة 4 عصراً.',
      en: 'Available for evening shifts only after 4:00 PM.',
    },
    status: 'rejected',
  },
];

/* -------------------------------------------------------------------------- */
/*  Local Persistence & Reactive Hooks                                        */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY_PHARMACY_PROFILE = 'pharmapath_pharmacy_profile';
const STORAGE_KEY_PHARMACY_APPS = 'pharmapath_pharmacy_applications';
export const STORAGE_KEY_CUSTOM_OPPS = 'pharmapath_custom_opportunities';
const STORE_EVENT = 'pharmapath-pharmacy-store';

const isBrowser = () => typeof window !== 'undefined';

function readJSON(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function updatePharmacyProfile(updatedFields) {
  if (!isBrowser()) return INITIAL_PHARMACY_PROFILE;
  const current = readJSON(STORAGE_KEY_PHARMACY_PROFILE, INITIAL_PHARMACY_PROFILE);
  const merged = { ...current, ...updatedFields };
  writeJSON(STORAGE_KEY_PHARMACY_PROFILE, merged);
  return merged;
}

export function updateApplicationStatus(applicationId, status) {
  if (!isBrowser()) return;
  const current = readJSON(STORAGE_KEY_PHARMACY_APPS, INITIAL_PHARMACY_APPLICATIONS);
  const next = current.map((app) =>
    app.id === applicationId ? { ...app, status } : app
  );
  writeJSON(STORAGE_KEY_PHARMACY_APPS, next);
}

export function addCustomOpportunity(formInput) {
  if (!isBrowser()) return null;
  const current = readJSON(STORAGE_KEY_CUSTOM_OPPS, []);
  const reqListAr = (formInput.requirementsAr || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const reqListEn = (formInput.requirementsEn || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const newOpp = {
    id: `opp-custom-${Date.now()}`,
    isCustom: true,
    sector: formInput.sector || 'community',
    city: formInput.city || 'amman',
    availablePositions: Math.max(1, Number(formInput.availablePositions) || 1),
    workingHours: formInput.workingHours || 'morning',
    availableDates: {
      from: formInput.dateFrom || '2025-06-01',
      to: formInput.dateTo || '2025-08-31',
    },
    interest: formInput.interest || 'counseling',
    title: {
      ar: formInput.titleAr?.trim() || formInput.titleEn?.trim() || 'فرصة تدريب صيدلاني جديدة',
      en: formInput.titleEn?.trim() || formInput.titleAr?.trim() || 'New Pharmacy Training Opportunity',
    },
    organization: {
      ar: formInput.organizationAr?.trim() || INITIAL_PHARMACY_PROFILE.pharmacyName,
      en: formInput.organizationEn?.trim() || INITIAL_PHARMACY_PROFILE.pharmacyNameEn,
    },
    locationDetail: {
      ar: formInput.locationAr?.trim() || 'عمّان',
      en: formInput.locationEn?.trim() || formInput.locationAr?.trim() || 'Amman',
    },
    schedule: {
      ar: formInput.scheduleAr?.trim() || 'الأحد – الخميس | 08:30 صباحاً – 02:30 ظهراً',
      en: formInput.scheduleEn?.trim() || formInput.scheduleAr?.trim() || 'Sun – Thu | 08:30 AM – 02:30 PM',
    },
    requirements: {
      ar: reqListAr.length > 0 ? reqListAr : ['إتمام مساق علم الأدوية الأساسي', 'إحضار كتاب التدريب الرسمي من الكلية'],
      en: reqListEn.length > 0 ? reqListEn : reqListAr.length > 0 ? reqListAr : ['Completion of foundational pharmacology', 'Official faculty training letter'],
    },
    summary: {
      ar: formInput.summaryAr?.trim() || 'برنامج تدريبي عملي بإشراف صيدلاني معتمد.',
      en: formInput.summaryEn?.trim() || formInput.summaryAr?.trim() || 'Hands-on training supervised by a licensed pharmacist.',
    },
    contact: {
      coordinator: {
        ar: formInput.coordinatorName?.trim() || INITIAL_PHARMACY_PROFILE.coordinatorName,
        en: formInput.coordinatorName?.trim() || INITIAL_PHARMACY_PROFILE.coordinatorNameEn,
      },
      email: formInput.contactEmail?.trim() || INITIAL_PHARMACY_PROFILE.email,
      phone: formInput.contactPhone?.trim() || INITIAL_PHARMACY_PROFILE.phone,
    },
  };

  writeJSON(STORAGE_KEY_CUSTOM_OPPS, [newOpp, ...current]);
  return newOpp;
}

export function deleteCustomOpportunity(opportunityId) {
  if (!isBrowser()) return;
  const current = readJSON(STORAGE_KEY_CUSTOM_OPPS, []);
  const next = current.filter((opp) => opp.id !== opportunityId);
  writeJSON(STORAGE_KEY_CUSTOM_OPPS, next);
}

export function getStoredCustomOpportunities() {
  return readJSON(STORAGE_KEY_CUSTOM_OPPS, []);
}

/* ----------------------------- React Hooks -------------------------------- */

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(STORE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORE_EVENT, callback);
  };
}

function useStoredValue(key, fallback) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? '',
    () => ''
  );
  return useMemo(() => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }, [raw, fallback]);
}

export function usePharmacyProfile() {
  return useStoredValue(STORAGE_KEY_PHARMACY_PROFILE, INITIAL_PHARMACY_PROFILE);
}

export function usePharmacyApplications() {
  return useStoredValue(STORAGE_KEY_PHARMACY_APPS, INITIAL_PHARMACY_APPLICATIONS);
}

export function useCustomOpportunities() {
  return useStoredValue(STORAGE_KEY_CUSTOM_OPPS, []);
}

export function usePharmacyOffers() {
  const custom = useCustomOpportunities();
  return useMemo(() => {
    // Include pharmacy's own default sample offer + any custom offers created in dashboard
    const defaultPharmacyOffer = opportunitiesSample.find(
      (opp) => opp.id === 'opp-community-amman-01'
    );
    return defaultPharmacyOffer ? [...custom, defaultPharmacyOffer] : custom;
  }, [custom]);
}

