import type { Talent } from "@/components/talent/TalentCard";

export const TALENT: Talent[] = [
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
    spotlight: "https://www.spotlight.com/placeholder",
    imdb: "https://imdb.com/name/nm0000001",
    cv: "/actors/cv-alex-smith.pdf",
    bio: "Short professional bio goes here.",
    credits: [{ title: "Short Film Title", type: "Film", year: 2023 }],
  },
  // Add more performers here
];

