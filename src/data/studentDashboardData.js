/**
 * Student Dashboard & Bookings Data
 * Dribbble-inspired pharmacy student portal state management.
 */

import { useMemo, useSyncExternalStore } from 'react';

export const INITIAL_STUDENT_PROFILE = {
  fullName: 'سارة أحمد الشقيرات',
  fullNameEn: 'Sara Ahmad Al-Shqirat',
  email: 'sara.student@pharmapath.edu.jo',
  role: 'student',
  city: 'amman',
  sector: 'community',
  registrationDate: '2025-05-10',
};

export const ACCEPTED_PLACEMENT = {
  id: 'opp-community-amman-01',
  title: {
    ar: 'تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات',
    en: 'Community Pharmacy Training — Patient Counseling & Dispensing',
  },
  organization: {
    ar: 'صيدلية المجتمع التعليمي — فرع عمّان الغربي',
    en: 'Educational Community Pharmacy — West Amman Branch',
  },
  pharmacyName: {
    ar: 'صيدلية المجتمع التعليمي النموذجية',
    en: 'Model Educational Community Pharmacy',
  },
  branch: {
    ar: 'فرع عمّان الغربي الرئيسي',
    en: 'West Amman Flagship Branch',
  },
  location: {
    ar: 'عمّان — شارع المدينة المنورة (بجانب دوار الكيلو)',
    en: 'Amman — Medina St. (Near Kilo Circle)',
  },
  city: 'amman',
  sector: 'community',
  status: 'accepted',
  statusLabel: { ar: 'مقبول ومؤكد', en: 'Accepted & Confirmed' },
  trainingTime: {
    ar: '08:30 صباحاً – 02:30 ظهراً (6 ساعات يومياً)',
    en: '08:30 AM – 02:30 PM (6 hours/day)',
  },
  trainingDays: {
    ar: 'الأحد – الخميس (5 أيام أسبوعياً)',
    en: 'Sunday – Thursday (5 days/week)',
    activeDays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    activeDaysEn: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
  },
  dates: {
    from: '2025-06-01',
    to: '2025-08-31',
  },
  coordinator: {
    name: { ar: 'قسم الإشراف التدريبي — صيدليات المجتمع', en: 'Community Training Supervision Desk' },
    phone: '+962 6 550 0101',
    email: 'community.training.sample@pharmapath.edu.jo',
  },
  summary: {
    ar: 'برنامج تدريبي عملي يركز على قراءة الوصفات الطبية، التحقق من الجرعات والتداخلات الدوائية، وتقديم المشورة الصيدلانية الآمنة للمرضى.',
    en: 'Hands-on training focused on prescription verification, dosage and interaction checks, OTC triage, and structured patient counseling.',
  },
  // Sample countdown snapshot derived from the post dates (from → to).
  countdown: {
    totalDays: 92,
    completedDays: 48,
    remainingDays: 44,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    bookingConfirmedDate: '2025-05-18',
  },
  // 0 = Sunday … 6 = Saturday
  activeWeekdays: [0, 1, 2, 3, 4],
};

export const INITIAL_BOOKINGS_HISTORY = [
  {
    id: 'book-101',
    opportunityId: 'opp-community-amman-01',
    pharmacyName: {
      ar: 'صيدلية المجتمع التعليمي — فرع عمّان الغربي',
      en: 'Educational Community Pharmacy — West Amman',
    },
    sector: 'community',
    city: 'amman',
    bookingDate: '2025-05-18',
    trainingPeriod: '2025-06-01 → 2025-08-31',
    schedule: { ar: 'الأحد – الخميس | 08:30 ص – 02:30 م', en: 'Sun – Thu | 08:30 AM – 02:30 PM' },
    status: 'accepted', // مقبول
    note: {
      ar: 'تم قبول طلبك لتدريب صيدلية المجتمع وفق المواعيد المحددة في الإعلان.',
      en: 'Your application has been accepted for the scheduled training dates.',
    },
  },
  {
    id: 'book-102',
    opportunityId: 'opp-hospital-amman-02',
    pharmacyName: {
      ar: 'المستشفى التعليمي التخصصي — قسم الصيدلة الداخلية',
      en: 'Specialty Teaching Hospital — Inpatient Pharmacy',
    },
    sector: 'hospital',
    city: 'amman',
    bookingDate: '2025-05-12',
    trainingPeriod: '2025-06-15 → 2025-09-15',
    schedule: { ar: 'الأحد – الخميس | 08:00 ص – 03:00 م', en: 'Sun – Thu | 08:00 AM – 03:00 PM' },
    status: 'pending', // قيد المراجعة / بندنق
    note: {
      ar: 'الطلب قيد المراجعة حالياً من قِبل منسق التدريب في المستشفى.',
      en: 'Application is currently under review by the hospital training coordinator.',
    },
  },
  {
    id: 'book-103',
    opportunityId: 'opp-company-amman-03',
    pharmacyName: {
      ar: 'شركة الرعاية الصيدلانية الحديثة — الشؤون التنظيمية',
      en: 'Modern Pharma Care — Regulatory Affairs',
    },
    sector: 'company',
    city: 'amman',
    bookingDate: '2025-05-02',
    trainingPeriod: '2025-07-01 → 2025-08-31',
    schedule: { ar: 'الأحد – الخميس | 09:00 ص – 04:00 م', en: 'Sun – Thu | 09:00 AM – 04:00 PM' },
    status: 'rejected', // غير مقبول / مرفوض
    note: {
      ar: 'نعتذر، اكتمل العدد المخصص للمقاعد التدريبية في هذه الفترة.',
      en: 'All available training seats for this period have been filled.',
    },
  },
];


/* -------------------------------------------------------------------------- */
/*  Local persistence (demo) — hydration-safe via useSyncExternalStore         */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY_BOOKINGS = 'pharmapath_student_bookings';
const STORAGE_KEY_PROFILE = 'pharmapath_student_profile';
const STORE_EVENT = 'pharmapath-store';

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
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function getStoredBookings() {
  return readJSON(STORAGE_KEY_BOOKINGS, INITIAL_BOOKINGS_HISTORY);
}

export function getStoredProfile() {
  return readJSON(STORAGE_KEY_PROFILE, INITIAL_STUDENT_PROFILE);
}

export function saveBooking(opp) {
  if (!isBrowser()) return { success: false };
  try {
    const current = getStoredBookings();
    const existing = current.find((b) => b.opportunityId === opp.id);
    if (existing) return { success: false, alreadyBooked: true, existing };

    const newBooking = {
      id: `book-${Date.now()}`,
      opportunityId: opp.id,
      pharmacyName: opp.organization || opp.title,
      sector: opp.sector || 'community',
      city: opp.city || 'amman',
      bookingDate: new Date().toISOString().split('T')[0],
      trainingPeriod: `${opp.availableDates?.from ?? ''} → ${opp.availableDates?.to ?? ''}`,
      schedule: opp.schedule || { ar: 'الأحد – الخميس', en: 'Sun – Thu' },
      status: 'pending',
      note: {
        ar: 'تم إرسال طلب الحجز بنجاح، وهو قيد المراجعة لدى منسق التدريب.',
        en: 'Booking request submitted and is pending coordinator review.',
      },
    };

    writeJSON(STORAGE_KEY_BOOKINGS, [newBooking, ...current]);
    return { success: true, booking: newBooking };
  } catch (err) {
    console.error('Failed to save booking:', err);
    return { success: false, error: err };
  }
}

export function updateStoredProfile(updatedFields) {
  if (!isBrowser()) return INITIAL_STUDENT_PROFILE;
  const merged = { ...getStoredProfile(), ...updatedFields };
  writeJSON(STORAGE_KEY_PROFILE, merged);
  return merged;
}

/* ----------------------------- React hooks -------------------------------- */

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

export function useStudentProfile() {
  return useStoredValue(STORAGE_KEY_PROFILE, INITIAL_STUDENT_PROFILE);
}

export function useStudentBookings() {
  return useStoredValue(STORAGE_KEY_BOOKINGS, INITIAL_BOOKINGS_HISTORY);
}
