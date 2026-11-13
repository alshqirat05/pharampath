'use client';

import { useState } from 'react';
import {
  addCustomOpportunity,
  deleteCustomOpportunity,
  updateApplicationStatus,
  updatePharmacyProfile,
  usePharmacyApplications,
  usePharmacyOffers,
  usePharmacyProfile,
} from '@/data/pharmacyDashboardData';
import PharmacyHeader from '@/components/pharmacy/PharmacyHeader';
import PharmacyStats from '@/components/pharmacy/PharmacyStats';
import PharmacyApplicationsSection from '@/components/pharmacy/PharmacyApplicationsSection';
import PharmacyProfileSection from '@/components/pharmacy/PharmacyProfileSection';
import PharmacyAddOfferSection from '@/components/pharmacy/PharmacyAddOfferSection';
import PharmacyOffersSection from '@/components/pharmacy/PharmacyOffersSection';

export default function PharmacyDashboardScreen() {
  const profile = usePharmacyProfile();
  const applications = usePharmacyApplications();
  const offers = usePharmacyOffers();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addOfferOpen, setAddOfferOpen] = useState(false);

  const handleSaveProfile = (updatedFields) => {
    updatePharmacyProfile(updatedFields);
    setEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4faf8] py-5 transition-colors sm:py-8 dark:bg-[#051411]">
      <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
        {/* Top Pharmacy Bar */}
        <PharmacyHeader
          profile={profile}
          onEditProfile={() => setEditProfileOpen(true)}
          onFocusAddOffer={() => setAddOfferOpen(true)}
        />

        {/* 4-Metric Summary Strip */}
        <PharmacyStats offers={offers} applications={applications} />

        {/* Row 1: Student Applications (Accept / Reject) & Pharmacy Profile */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PharmacyApplicationsSection
              applications={applications}
              onAccept={(id) => updateApplicationStatus(id, 'accepted')}
              onReject={(id) => updateApplicationStatus(id, 'rejected')}
            />
          </div>
          <div className="lg:col-span-4">
            <PharmacyProfileSection
              profile={profile}
              onSaveProfile={handleSaveProfile}
              externalEditOpen={editProfileOpen}
              onCloseExternalEdit={() => setEditProfileOpen(false)}
            />
          </div>
        </div>

        {/* Row 2: Published Offers + Add Offer Button (opens modal) */}
        <PharmacyOffersSection
          offers={offers}
          onDeleteOffer={deleteCustomOpportunity}
          onOpenAddOffer={() => setAddOfferOpen(true)}
        />

        {/* Add New Offer Modal Window */}
        <PharmacyAddOfferSection
          isOpen={addOfferOpen}
          onClose={() => setAddOfferOpen(false)}
          profile={profile}
          onAddOffer={addCustomOpportunity}
        />
      </div>
    </div>
  );
}
