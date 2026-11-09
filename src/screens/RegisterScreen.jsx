'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Building2,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { SECTORS, CITIES } from '@/data/sectorsConfig';
import InputField from '@/components/ui/InputField';
import { useLanguage } from '@/context/LanguageProvider';
import { updateStoredProfile } from '@/data/studentDashboardData';
import medicineIllustration from '@/imgs/undraw_medicine_hqqg.svg';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { pick } = useLanguage();

  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('amman');
  const [sector, setSector] = useState('community');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    setSubmitted(true);
    setLoading(true);
    updateStoredProfile({
      fullName,
      email,
      city,
      sector,
      role,
    });
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-[85vh] bg-[#f6fbfa] dark:bg-[#051411] py-10 sm:py-16 flex items-center transition-colors">
      <div className="mx-auto w-full max-w-lg lg:max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Showcase Card (Hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden rounded-3xl border border-[#99dcd2]/70 dark:border-[#1e403a] bg-gradient-to-br from-[#e7f7f4] via-[#f1faf8] to-white dark:from-[#09221d] dark:via-[#0c2822] dark:to-[#061714] p-6 sm:p-8 flex-col justify-between shadow-xs">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-16 -start-16 w-52 h-52 rounded-full bg-[#00a78e]/15 blur-3xl dark:bg-[#00a78e]/20" />
            <div className="pointer-events-none absolute -bottom-16 -end-16 w-56 h-56 rounded-full bg-[#99dcd2]/30 blur-3xl dark:bg-[#00a78e]/10" />

            {/* Top Brand Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0b1e1b]/80 border border-[#99dcd2] dark:border-[#1e403a] text-xs font-bold text-[#006455] dark:text-[#99dcd2] shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00a78e]" />
                <span>PharmaPath</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006455]/70 dark:text-[#99dcd2]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00a78e]" />
                <span>Portal</span>
              </span>
            </div>

            {/* Illustration: Medicine (الرئيسية، واضحة وحيوية) */}
            <div className="relative my-6 sm:my-8 flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-56 sm:w-64 md:w-72 h-44 sm:h-52 filter drop-shadow-md"
              >
                <Image
                  src={medicineIllustration}
                  alt="Medicine & Pharmacy"
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Bottom Insight Card */}
            <div className="relative z-10 pt-4 border-t border-[#99dcd2]/40 dark:border-[#1e403a]/70">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#00a78e]/10 dark:bg-[#00a78e]/20 text-[#00a78e] shrink-0 mt-0.5">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#00211c] dark:text-white">
                    {role === 'student' ? t('authPages.roleStudent') : t('authPages.roleCoordinator')}
                  </h3>
                  <p className="text-[11px] text-[#004339]/80 dark:text-[#99dcd2]/80 mt-0.5 leading-relaxed">
                    {role === 'student' ? t('authPages.roleStudentDesc') : t('authPages.roleCoordinatorDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="rounded-3xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] p-7 sm:p-9 shadow-xs">
              <div className="mb-6">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#00211c] dark:text-white mb-2">
                  {t('authPages.registerTitle')}
                </h1>
                <p className="text-sm text-[#004339]/80 dark:text-[#99dcd2]/80">
                  {t('authPages.registerSubtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selector Section */}
                <div>
                  <span className="block text-xs font-semibold text-[#004339] dark:text-[#ccede8] mb-2">
                    {t('authPages.roleLabel')}
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`rounded-2xl border p-3 flex items-center gap-2.5 text-start transition-all cursor-pointer ${
                        role === 'student'
                          ? 'bg-[#00a78e] text-white border-[#00a78e] shadow-xs'
                          : 'bg-[#ccede8]/20 dark:bg-[#061a16] text-[#004339] dark:text-[#ccede8] border-[#99dcd2] dark:border-[#1e403a] hover:bg-[#ccede8]/40 dark:hover:bg-[#0d2a23]'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg shrink-0 ${
                          role === 'student'
                            ? 'bg-white/20 text-white'
                            : 'bg-[#00a78e]/10 text-[#00a78e]'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold truncate">
                          {t('authPages.roleStudent')}
                        </span>
                        <span
                          className={`block text-[10px] truncate ${
                            role === 'student' ? 'text-white/80' : 'opacity-70'
                          }`}
                        >
                          {t('authPages.roleStudentDesc')}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('coordinator')}
                      className={`rounded-2xl border p-3 flex items-center gap-2.5 text-start transition-all cursor-pointer ${
                        role === 'coordinator'
                          ? 'bg-[#00a78e] text-white border-[#00a78e] shadow-xs'
                          : 'bg-[#ccede8]/20 dark:bg-[#061a16] text-[#004339] dark:text-[#ccede8] border-[#99dcd2] dark:border-[#1e403a] hover:bg-[#ccede8]/40 dark:hover:bg-[#0d2a23]'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg shrink-0 ${
                          role === 'coordinator'
                            ? 'bg-white/20 text-white'
                            : 'bg-[#00a78e]/10 text-[#00a78e]'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold truncate">
                          {t('authPages.roleCoordinator')}
                        </span>
                        <span
                          className={`block text-[10px] truncate ${
                            role === 'coordinator' ? 'text-white/80' : 'opacity-70'
                          }`}
                        >
                          {t('authPages.roleCoordinatorDesc')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Full Name Field */}
                <InputField
                  id="register-name"
                  label={t('authPages.fullNameLabel')}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                {/* Email Field */}
                <InputField
                  id="register-email"
                  type="email"
                  label={t('authPages.emailLabel')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* City & Sector Selects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="block">
                    <span className="block text-xs font-semibold text-[#004339] dark:text-[#ccede8] mb-1.5">
                      {t('authPages.cityLabel')}
                    </span>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-[#ccede8]/25 dark:bg-[#0b1e1b] px-4 py-2.5 text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:bg-white dark:focus:bg-[#061a16] focus:outline-none transition-colors"
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.id} className="dark:bg-[#0b1e1b]">
                          {pick(c.label)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="block text-xs font-semibold text-[#004339] dark:text-[#ccede8] mb-1.5">
                      {t('authPages.sectorLabel')}
                    </span>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-[#ccede8]/25 dark:bg-[#0b1e1b] px-4 py-2.5 text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:bg-white dark:focus:bg-[#061a16] focus:outline-none transition-colors"
                    >
                      {SECTORS.map((s) => (
                        <option key={s.id} value={s.id} className="dark:bg-[#0b1e1b]">
                          {pick(s.label)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Password Field */}
                <InputField
                  id="register-password"
                  type="password"
                  label={t('authPages.passwordLabel')}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Feedback Notice Section */}
                {submitted && (
                  <div className="rounded-xl bg-[#ccede8]/40 dark:bg-[#061a16] border border-[#99dcd2] dark:border-[#1e403a] p-3 flex items-center gap-2 text-xs font-medium text-[#004339] dark:text-[#99dcd2]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a78e] shrink-0" />
                    <span>تم إنشاء الحساب بنجاح! جاري التوجيه إلى لوحة الطالب...</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#00a78e] hover:bg-[#008672] text-white py-3.5 text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري التجهيز والدخول إلى لوحة الطالب...</span>
                    </>
                  ) : (
                    <span>{t('authPages.registerSubmit')}</span>
                  )}
                </button>
              </form>

              {/* Switch to Login Section */}
              <div className="mt-6 pt-5 border-t border-[#ccede8] dark:border-[#1e403a] text-xs text-[#004339]/80 dark:text-[#99dcd2]/80 flex items-center justify-between">
                <span>{t('authPages.switchToLogin')}</span>
                <Link
                  href="/auth/login"
                  className="font-bold text-[#00a78e] dark:text-[#33b9a5] hover:underline"
                >
                  {t('authPages.loginSubmit')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
