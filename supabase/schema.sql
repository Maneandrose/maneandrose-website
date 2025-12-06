-- Enable UUID generation (Supabase usually has this, but keep it for safety)
create extension if not exists "pgcrypto";

-- Main actors table
create table if not exists public.actors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  stage_name text,
  role_type text default 'Actor', -- Actor / Voice / Commercial / Multidisciplinary
  gender text,
  ethnicity text,
  playing_age_min int,
  playing_age_max int,
  location text,
  spotlight_link text,
  instagram text,
  tiktok text,
  website text,
  cv_url text,
  notes text,
  is_active boolean not null default true
);

create index if not exists actors_last_name_idx on public.actors (last_name);
create index if not exists actors_stage_name_idx on public.actors (stage_name);
create index if not exists actors_is_active_idx on public.actors (is_active);

-- Media attached to actors (showreels, self-tapes, voice reels etc)
create table if not exists public.actor_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid not null references public.actors(id) on delete cascade,
  type text not null, -- showreel / voice / self-tape / clip
  title text,
  url text not null,
  thumbnail_url text
);

create index if not exists actor_media_actor_id_idx on public.actor_media (actor_id);

-- Production / casting enquiries
create table if not exists public.production_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text,
  contact_name text,
  email text not null,
  phone text,
  project_title text,
  brief text,
  usage text,
  dates text,
  budget text,
  status text not null default 'new' -- new / in_progress / closed
);

create index if not exists production_enquiries_status_idx on public.production_enquiries (status);

-- General contact messages (from Contact page etc)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  source text -- e.g. "contact_page" / "producer_form"
);

