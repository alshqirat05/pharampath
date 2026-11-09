'use client';

import { useState } from 'react';
import {
  ACCEPTED_PLACEMENT,
  updateStoredProfile,
  useStudentBookings,
  useStudentProfile,
} from '@/data/studentDashboardData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import TrainingCountdownSection from '@/components/dashboard/TrainingCountdownSection';
import AcceptedPharmacySection from '@/components/dashboard/AcceptedPharmacySection';
import BookingsHistorySection from '@/components/dashboard/BookingsHistorySection';
import StudentProfileSection from '@/components/dashboard/StudentProfileSection';

export default function DashboardScreen() {
  const profile = useStudentProfile();
  const bookings = useStudentBookings();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const handleSaveProfile = (updatedFields) => {
    updateStoredProfile(updatedFields);
    setEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4faf8] py-5 transition-colors sm:py-8 dark:bg-[#051411]">
      <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
        {/* Top Student Bar */}
        <DashboardHeader
          profile={profile}
          onEditProfile={() => setEditProfileOpen(true)}
        />

        {/* 4-Metric Summary Strip */}
        <DashboardStats placement={ACCEPTED_PLACEMENT} bookings={bookings} />

        {/* Row 1: Countdown & Accepted Pharmacy (Equal-Height 6 + 6 Columns) */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TrainingCountdownSection placement={ACCEPTED_PLACEMENT} />
          </div>
          <div className="lg:col-span-6">
            <AcceptedPharmacySection placement={ACCEPTED_PLACEMENT} />
          </div>
        </div>

        {/* Row 2: Bookings History & Registered Profile (Equal-Height 8 + 4 Columns) */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingsHistorySection bookings={bookings} />
          </div>
          <div className="lg:col-span-4">
            <StudentProfileSection
              profile={profile}
              onSaveProfile={handleSaveProfile}
              externalEditOpen={editProfileOpen}
              onCloseExternalEdit={() => setEditProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
