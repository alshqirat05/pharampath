'use client';

import { SECTOR_BY_ID } from '@/data/sectorsConfig';
import { useLanguage } from '@/context/LanguageProvider';

export default function SectorTag({ sectorId, short = false, className = '' }) {
  const { pick } = useLanguage();
  const sector = SECTOR_BY_ID[sectorId] || SECTOR_BY_ID.community;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${sector.badgeClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${sector.dotClass}`} aria-hidden="true" />
      <span>{pick(short ? sector.shortLabel : sector.label)}</span>
    </span>
  );
}
