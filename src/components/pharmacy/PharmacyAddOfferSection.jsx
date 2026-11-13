'use client';

import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import {
  CITIES,
  PROFESSIONAL_INTERESTS,
  SECTORS,
  WORKING_HOURS_OPTIONS,
} from '@/data/sectorsConfig';
import { useLanguage } from '@/context/LanguageProvider';

const INITIAL_FORM = {
  titleAr: '',
  sector: 'community',
  city: 'amman',
  locationAr: '',
  availablePositions: 2,
  workingHours: 'morning',
  interest: 'counseling',
  scheduleAr: 'الأحد – الخميس | 08:30 صباحاً – 02:30 ظهراً',
  dateFrom: '2025-06-01',
  dateTo: '2025-08-31',
  summaryAr: '',
  requirementsAr: '',
};

export default function PharmacyAddOfferSection({ isOpen, onClose, profile, onAddOffer }) {
  const { pick, language } = useLanguage();
  const isEn = language === 'en';
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    sector: profile.sector || 'community',
    city: profile.city || 'amman',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titleAr.trim() || !form.summaryAr.trim()) return;

    onAddOffer({
      ...form,
      organizationAr: profile.pharmacyName,
      organizationEn: profile.pharmacyNameEn || profile.pharmacyName,
      coordinatorName: profile.coordinatorName,
      contactEmail: profile.email,
      contactPhone: profile.phone,
    });

    setForm({
      ...INITIAL_FORM,
      sector: profile.sector || 'community',
      city: profile.city || 'amman',
    });
    onClose();
  };

  const inputCls =
    'w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2 text-xs font-medium text-[#00211c] placeholder:text-[#7a958f] focus:border-[#00a78e] focus:bg-white focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white dark:focus:border-[#00a78e]';
  const labelCls = 'mb-1 block text-xs font-semibold text-[#00211c] dark:text-white';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl border border-[#dcefea] bg-white shadow-xl dark:border-[#1e403a] dark:bg-[#0b1e1b]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#eef7f5] px-5 py-4 dark:border-[#16332d] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#f3b8c1] bg-[#fde8eb]/75 text-[#a70019] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81]">
              <PlusCircle className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#00211c] dark:text-white">
                {isEn ? 'Publish New Training Offer' : 'إضافة إعلان تدريبي جديد'}
              </h3>
              <p className="text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">
                {isEn
                  ? 'Matches the student opportunity card layout'
                  : 'نموذج متوافق مع بطاقات الفرص التي تظهر للطلاب'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'إغلاق'}
            className="cursor-pointer rounded-lg p-1.5 text-[#4f6f69] hover:bg-[#eef7f5] dark:text-[#8fb8b0] dark:hover:bg-[#16332d]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-3.5">
          <div>
            <label className={labelCls}>
              {isEn ? 'Opportunity Title *' : 'عنوان الإعلان التدريبي *'}
            </label>
            <input
              type="text"
              required
              value={form.titleAr}
              onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
              placeholder={
                isEn
                  ? 'e.g., Community Pharmacy — Patient Counseling'
                  : 'مثال: تدريب صيدلية مجتمع — الإرشاد الدوائي وصرف الوصفات'
              }
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>{isEn ? 'Sector' : 'القطاع التدريبي'}</label>
              <select
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                className={inputCls}
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {pick(s.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>{isEn ? 'City' : 'المدينة'}</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={inputCls}
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {pick(c.label)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>
                {isEn ? 'Detailed Location *' : 'الموقع التفصيلي *'}
              </label>
              <input
                type="text"
                required
                value={form.locationAr}
                onChange={(e) => setForm({ ...form, locationAr: e.target.value })}
                placeholder={isEn ? 'e.g., Amman — Medina St.' : 'مثال: عمّان — شارع المدينة المنورة'}
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>
                {isEn ? 'Available Seats' : 'عدد المقاعد المتاحة'}
              </label>
              <input
                type="number"
                min={1}
                max={50}
                required
                value={form.availablePositions}
                onChange={(e) => setForm({ ...form, availablePositions: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>{isEn ? 'Shift Type' : 'نظام الدوام'}</label>
              <select
                value={form.workingHours}
                onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                className={inputCls}
              >
                {WORKING_HOURS_OPTIONS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {pick(w.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>{isEn ? 'Focus Area' : 'مجال التركيز'}</label>
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className={inputCls}
              >
                {PROFESSIONAL_INTERESTS.map((i) => (
                  <option key={i.id} value={i.id}>
                    {pick(i)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>
              {isEn ? 'Schedule & Hours' : 'أوقات وساعات التدريب'}
            </label>
            <input
              type="text"
              required
              value={form.scheduleAr}
              onChange={(e) => setForm({ ...form, scheduleAr: e.target.value })}
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>{isEn ? 'Start Date' : 'تاريخ البدء'}</label>
              <input
                type="date"
                dir="ltr"
                required
                value={form.dateFrom}
                onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>{isEn ? 'End Date' : 'تاريخ الانتهاء'}</label>
              <input
                type="date"
                dir="ltr"
                required
                value={form.dateTo}
                onChange={(e) => setForm({ ...form, dateTo: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>
              {isEn ? 'Program Summary *' : 'نبذة عن البرنامج التدريبي *'}
            </label>
            <textarea
              rows={2}
              required
              value={form.summaryAr}
              onChange={(e) => setForm({ ...form, summaryAr: e.target.value })}
              placeholder={
                isEn
                  ? 'Brief description of daily tasks and learning goals...'
                  : 'وصف مختصر للمهام اليومية والمهارات التي سيكتسبها الطالب...'
              }
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>
              {isEn ? 'Requirements (one per line)' : 'متطلبات الالتحاق (كل متطلب في سطر)'}
            </label>
            <textarea
              rows={2}
              value={form.requirementsAr}
              onChange={(e) => setForm({ ...form, requirementsAr: e.target.value })}
              placeholder={
                isEn
                  ? 'Completed Pharmacology I\nOfficial faculty training letter'
                  : 'إتمام مساق علم الأدوية (1) بنجاح\nإحضار كتاب التدريب الميداني الرسمي من الكلية'
              }
              className={inputCls}
            />
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="submit"
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#a70019] py-2.5 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#8a0015]"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{isEn ? 'Publish Offer' : 'نشر الإعلان'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-[#dcefea] bg-white py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#4f6f69] transition-colors hover:bg-[#f8fcfb] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#8fb8b0]"
            >
              {isEn ? 'Cancel' : 'إلغاء'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
