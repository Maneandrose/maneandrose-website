import Link from "next/link";
import Image from "next/image";

export type TalentRoleType = "Actor" | "Voice" | "Commercial" | "Multidisciplinary";

export interface Talent {
  id: string;
  slug: string;
  name: string;
  roleType: TalentRoleType;
  playingAge: string;
  gender: string;
  ethnicity: string;
  location: string;
  headshotUrl: string;
  spotlight?: string;
  imdb?: string;
  cv?: string;
  bio?: string;
  credits?: { title: string; type: string; year: number }[];
}

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <Link
      href={`/talent/${talent.slug}`}
      className="group rounded-2xl bg-white shadow-card border border-neutral-200 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Image
          src={talent.headshotUrl}
          alt={talent.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold">{talent.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
            {talent.roleType}
          </span>
        </div>

        <p className="text-xs text-neutral-600">
          Playing age {talent.playingAge} · {talent.gender} · {talent.ethnicity}
        </p>

        <p className="text-xs text-neutral-500 mt-auto">Based in {talent.location}</p>

        <span className="mt-3 inline-flex text-xs font-medium text-brand-primary group-hover:underline">
          View profile
        </span>
      </div>
    </Link>
  );
}

