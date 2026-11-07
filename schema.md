# PharmaPath — Proposed Supabase Schema

All current platform records are clearly flagged **sample educational data** (`src/data/*`). Below is the ready-to-apply PostgreSQL / Supabase schema when connecting a live database.

```sql
-- 1. User Profiles (Students & Training Coordinators)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student', 'coordinator')),
  full_name text not null,
  city text,
  preferred_sector text check (preferred_sector in ('community', 'hospital', 'company', 'factory')),
  created_at timestamptz not null default now()
);

-- 2. Training Opportunities across the 4 Pharmaceutical Sectors
create table public.training_opportunities (
  id uuid primary key default gen_random_uuid(),
  sector text not null check (sector in ('community', 'hospital', 'company', 'factory')),
  city text not null,
  available_positions int not null default 1,
  working_hours text not null check (working_hours in ('morning', 'evening', 'flexible')),
  available_from date not null,
  available_to date not null,
  interest text not null,
  title_ar text not null,
  title_en text not null,
  organization_ar text not null,
  organization_en text not null,
  location_detail_ar text not null,
  location_detail_en text not null,
  schedule_ar text not null,
  schedule_en text not null,
  requirements_ar text[] not null default '{}',
  requirements_en text[] not null default '{}',
  summary_ar text not null,
  summary_en text not null,
  coordinator_ar text not null,
  coordinator_en text not null,
  contact_email text not null,
  contact_phone text not null,
  created_at timestamptz not null default now()
);
```
