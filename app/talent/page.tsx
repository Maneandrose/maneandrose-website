"use client";

import { useState, useMemo } from "react";
import { Talent, TalentCard, TalentRoleType } from "@/components/talent/TalentCard";

const ALL = "All";

const ROLE_TYPES: (TalentRoleType | "All")[] = [
  ALL,
  "Actor",
  "Voice",
  "Commercial",
  "Multidisciplinary",
];

const PLAYING_AGE_FILTERS = [
  { label: "All ages", value: ALL },
  { label: "Teens", value: "Teens" },
  { label: "20s", value: "20s" },
  { label: "30s", value: "30s" },
  { label: "40+", value: "40+" },
];

// Temporary mock data (swap for Supabase later)
const TALENT: Talent[] = [
  {
    id: "1",
    slug: "alex-smith",
    name: "Alex Smith",
    roleType: "Actor",
    playingAge: "20s–30s",
    gender: "Male",
    ethnicity: "Black British",
    location: "London",
    headshotUrl: "/actors/alex-smith.jpg",
  },
  {
    id: "2",
    slug: "nina-jones",
    name: "Nina Jones",
    roleType: "Actor",
    playingAge: "20s",
    gender: "Female",
    ethnicity: "Mixed Heritage",
    location: "London / Manchester",
    headshotUrl: "/actors/nina-jones.jpg",
  },
  {
    id: "3",
    slug: "sam-ade",
    name: "Sam Ade",
    roleType: "Voice",
    playingAge: "30s–40s",
    gender: "Male",
    ethnicity: "West African",
    location: "London",
    headshotUrl: "/actors/sam-ade.jpg",
  },
  {
    id: "4",
    slug: "jordan-lee",
    name: "Jordan Lee",
    roleType: "Commercial",
    playingAge: "20s",
    gender: "Non-binary",
    ethnicity: "East Asian",
    location: "London / Remote",
    headshotUrl: "/actors/jordan-lee.jpg",
  },
];

function matchesPlayingAge(playingAge: string, filter: string) {
  if (filter === ALL) return true;
  if (filter === "40+") return playingAge.includes("40");
  return playingAge.includes(filter);
}

export default function TalentPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<(typeof ROLE_TYPES)[number]>(ALL);
  const [genderFilter, setGenderFilter] = useState<string>(ALL);
  const [ageFilter, setAgeFilter] = useState<string>(ALL);
  const [ethnicityFilter, setEthnicityFilter] = useState<string>(ALL);

  const filteredTalent = useMemo(() => {
    return TALENT.filter((t) => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (roleFilter !== ALL && t.roleType !== roleFilter) return false;

      if (genderFilter !== ALL && t.gender !== genderFilter) return false;

      if (!matchesPlayingAge(t.playingAge, ageFilter)) return false;

      if (ethnicityFilter !== ALL && !t.ethnicity.toLowerCase().includes(ethnicityFilter.toLowerCase()))
        return false;

      return true;
    });
  }, [search, roleFilter, genderFilter, ageFilter, ethnicityFilter]);

  const uniqueGenders = [...new Set(TALENT.map((t) => t.gender))];
  const uniqueEthnicities = [...new Set(TALENT.map((t) => t.ethnicity))];

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Page heading */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Our talent</p>
          <h1 className="mt-2 text-4xl font-display font-semibold tracking-tight">Browse Mane &amp; Rose Talent</h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-600">
            Use search and filters to explore our roster of actors, voice artists and commercial performers.
          </p>
        </header>

        {/* Filters panel */}
        <div className="mb-8 grid gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-neutral-600">Search by name</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Start typing a performer’s name…"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600">Role type</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              {ROLE_TYPES.map((type) => (
                <option key={type}>{type === ALL ? "All roles" : type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600">Playing age</label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              {PLAYING_AGE_FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600">Gender</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              <option>All</option>
              {uniqueGenders.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600">Ethnicity</label>
            <select
              value={ethnicityFilter}
              onChange={(e) => setEthnicityFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              <option>All</option>
              {uniqueEthnicities.map((eth) => (
                <option key={eth}>{eth}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-neutral-600 mb-4">
          Showing <span className="font-medium">{filteredTalent.length}</span> of {TALENT.length} performers
        </p>

        {/* Talent grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTalent.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
