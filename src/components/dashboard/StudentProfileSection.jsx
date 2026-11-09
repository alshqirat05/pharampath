'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building, Check, Mail, MapPin, PencilLine, ShieldCheck, User, X } from 'lucide-react';
import { CITIES, SECTORS } from '@/data/sectorsConfig';
import DashboardCard from './DashboardCard';

export default function StudentProfileSection({
  profile,
  onSaveProfile,
  externalEditOpen = false,
  onCloseExternalEdit,
}) {
  const { t } = useTranslation('common');
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

  const roleText =
    profile.role === 'coordinator' ? t('authPages.roleCoordinator') : t('authPages.roleStudent');

  const fields = [
    {
      key: 'fullName',
      icon: User,
      label: t('authPages.fullNameLabel'),
      value: profile.fullName,
    },
    {
      key: 'email',
      icon: Mail,
      label: t('authPages.emailLabel'),
      value: profile.email,
      dir: 'ltr',
    },
    {
      key: 'role',
      icon: ShieldCheck,
      label: t('authPages.roleLabel'),
      value: roleText,
    },
    {
      key: 'city',
      icon: MapPin,
      label: t('authPages.cityLabel'),
      value: t(`cities.${profile.city || 'amman'}`),
    },
    {
      key: 'sector',
      icon: Building,
      label: t('authPages.sectorLabel'),
      value: t(`sectors.${profile.sector || 'community'}.name`),
    },
  ];

  return (
    <>
      <DashboardCard
        title={t('dashboard.profile.title')}
        description={t('dashboard.profile.desc')}
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
        className="h-full"
        bodyClassName="flex flex-col justify-between gap-3"
      >
        <dl className="divide-y divide-[#eef7f5] rounded-xl border border-[#eef7f5] bg-[#f8fcfb] dark:divide-[#16332d] dark:border-[#16332d] dark:bg-[#0d231f]">
          {fields.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center justify-between gap-3 px-3.5 py-3">
                <dt className="flex items-center gap-2 text-xs text-[#4f6f69] dark:text-[#8fb8b0] shrink-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#d5eee9] bg-[#eef8f6] text-[#00a78e] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{item.label}</span>
                </dt>
                <dd
                  dir={item.dir}
                  className="truncate text-xs font-semibold text-[#00211c] dark:text-white max-w-[60%] text-end"
                >
                  {item.value}
                </dd>
              </div>
            );
          })}
        </dl>

        {profile.registrationDate && (
          <p className="text-center text-[11px] text-[#7a958f] dark:text-[#6f978f]">
            {t('dashboard.profile.memberSince', { date: profile.registrationDate })}
          </p>
        )}
      </DashboardCard>

      {/* Edit Registered Info Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-[#dcefea] bg-white p-6 shadow-xl dark:border-[#1e403a] dark:bg-[#0b1e1b]">
            <div className="mb-4 flex items-center justify-between border-b border-[#eef7f5] pb-3 dark:border-[#16332d]">
              <h3 className="text-base font-bold text-[#00211c] dark:text-white">{t('dashboard.profile.modalTitle')}</h3>
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
                  {t('authPages.fullNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 py-2.5 text-xs font-medium text-[#00211c] focus:border-[#00a78e] focus:outline-none dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
                />
              </div>

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
                    {CITIES.map((cityId) => (
                      <option key={cityId} value={cityId}>
                        {t(`cities.${cityId}`)}
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
                        {t(`sectors.${s.id}.name`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="submit"
                  className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#00a78e] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#008672]"
                >
                  <Check className="h-4 w-4" />
                  <span>{t('dashboard.profile.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer rounded-xl border border-[#dcefea] px-4 py-2.5 text-xs font-semibold text-[#4f6f69] hover:bg-[#f8fcfb] dark:border-[#1e403a] dark:text-[#8fb8b0] dark:hover:bg-[#0d231f]"
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
