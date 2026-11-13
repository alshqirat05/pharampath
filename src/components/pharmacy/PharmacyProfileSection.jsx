'use client';

import { useState } from 'react';
import {
  Building2,
  Check,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES, SECTORS } from '@/data/sectorsConfig';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useLanguage } from '@/context/LanguageProvider';

export default function PharmacyProfileSection({
  profile,
  onSaveProfile,
  externalEditOpen = false,
  onCloseExternalEdit,
}) {
  const { t } = useTranslation('common');
  const { pick, language } = useLanguage();
  const isEn = language === 'en';
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [formData, setFormData] = useState(profile);

  const isEditing = localModalOpen || externalEditOpen;

  const openModal = () => {
    setFormData(profile);
    setLocalModalOpen(true);
  };

  const closeModal = () => {
    setLocalModalOpen(false);
    if (onCloseExternalEdit) onCloseExternalEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    closeModal();
  };

  const cityObj = CITIES.find((c) => c.id === profile.city);
  const sectorObj = SECTORS.find((s) => s.id === profile.sector);
  const pharmacyTitle =
    isEn && profile.pharmacyNameEn ? profile.pharmacyNameEn : profile.pharmacyName;
  const coordinatorTitle =
    isEn && profile.coordinatorNameEn ? profile.coordinatorNameEn : profile.coordinatorName;

  const compactItems = [
    {
      key: 'city',
      icon: MapPin,
      label: t('authPages.cityLabel'),
      value: cityObj ? pick(cityObj.label) : profile.city,
      accent: 'rose',
    },
    {
      key: 'sector',
      icon: ShieldCheck,
      label: t('authPages.sectorLabel'),
      value: sectorObj ? pick(sectorObj.label) : profile.sector,
      accent: 'teal',
    },
    {
      key: 'phone',
      icon: Phone,
      label: isEn ? 'Phone' : 'الهاتف',
      value: profile.phone,
      dir: 'ltr',
      accent: 'rose',
    },
    {
      key: 'email',
      icon: Mail,
      label: isEn ? 'Email' : 'البريد',
      value: profile.email,
      dir: 'ltr',
      accent: 'teal',
    },
  ];

  return (
    <>
      <DashboardCard
        icon={Building2}
        title={isEn ? 'Pharmacy Details' : 'بيانات الصيدلية المعتمدة'}
        action={
          <button
            type="button"
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#dcefea] bg-[#f8fcfb] px-2.5 py-1 text-xs font-semibold text-[#007a68] transition-colors hover:border-[#00a78e] hover:bg-[#eef8f6] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#5fd3bf] dark:hover:border-[#00a78e]"
          >
            <PencilLine className="h-3.5 w-3.5 text-[#00a78e]" />
            <span>{t('dashboard.profile.edit')}</span>
          </button>
        }
        bodyClassName="space-y-3"
      >
        {/* Compact Identity Header */}
        <div className="rounded-xl border border-[#eef7f5] bg-[#f8fcfb] p-3.5 dark:border-[#16332d] dark:bg-[#0d231f]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#00211c] dark:text-white leading-snug">
                {pharmacyTitle}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#4f6f69] dark:text-[#8fb8b0]">
                <UserCheck className="h-3.5 w-3.5 text-[#00a78e] shrink-0" />
                <span className="truncate">{coordinatorTitle}</span>
              </p>
            </div>
            {profile.licenseNumber && (
              <span className="shrink-0 rounded-md border border-[#f3b8c1] bg-[#fde8eb]/75 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#7a0012] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81]">
                {profile.licenseNumber}
              </span>
            )}
          </div>
        </div>

        {/* 2x2 Compact Metadata Grid */}
        <div className="grid grid-cols-2 gap-2">
          {compactItems.map((item) => {
            const Icon = item.icon;
            const iconCls =
              item.accent === 'rose'
                ? 'text-[#a70019] dark:text-[#ff6b81]'
                : 'text-[#00a78e] dark:text-[#5fd3bf]';
            return (
              <div
                key={item.key}
                className="rounded-xl border border-[#eef7f5] bg-[#f8fcfb] p-2.5 dark:border-[#16332d] dark:bg-[#0d231f] min-w-0"
              >
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#4f6f69] dark:text-[#8fb8b0]">
                  <Icon className={`h-3 w-3 shrink-0 ${iconCls}`} />
                  <span className="truncate">{item.label}</span>
                </span>
                <p
                  dir={item.dir}
                  className="mt-1 truncate text-xs font-semibold text-[#00211c] dark:text-white"
                  title={item.value}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </DashboardCard>

      {/* Edit Pharmacy Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-[#dcefea] bg-white p-6 shadow-xl dark:border-[#1e403a] dark:bg-[#0b1e1b]">
            <div className="mb-4 flex items-center justify-between border-b border-[#eef7f5] pb-3 dark:border-[#16332d]">
              <h3 className="text-base font-bold text-[#00211c] dark:text-white">
                {isEn ? 'Edit Pharmacy Information' : 'تعديل بيانات الصيدلية'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer rounded-lg p-1.5 text-[#4f6f69] hover:bg-[#eef7f5] dark:text-[#8fb8b0] dark:hover:bg-[#16332d]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                  {isEn ? 'Pharmacy Name' : 'اسم الصيدلية / المنشأة'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.pharmacyName}
                  onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                  className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                  {isEn ? 'Coordinator Name' : 'اسم منسق التدريب'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.coordinatorName}
                  onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                  className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                    {t('authPages.emailLabel')}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                    {isEn ? 'Phone' : 'رقم الهاتف'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                    {t('authPages.cityLabel')}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {pick(c.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#00211c] dark:text-white">
                    {t('authPages.sectorLabel')}
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                  >
                    {SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {pick(s.label)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="submit"
                  className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#00a78e] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#008672]"
                >
                  <Check className="h-4 w-4" />
                  <span>{t('dashboard.profile.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 cursor-pointer rounded-xl border border-[#dcefea] bg-white py-2.5 text-xs font-semibold text-[#4f6f69] transition-colors hover:bg-[#f8fcfb] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#8fb8b0]"
                >
                  {t('dashboard.profile.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

