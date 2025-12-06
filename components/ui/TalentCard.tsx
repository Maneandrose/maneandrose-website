import Link from "next/link";

export interface Talent {
  slug: string;
  name: string;
  playingAge?: string;
  ethnicity?: string;
  location?: string;
  headshotUrl: string;
}

export function TalentCard({ talent }: { talent: Talent }) {
  return (
    <article className="rounded-xl2 overflow-hidden shadow-card bg-white hover:shadow-card-hover transition-shadow duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={talent.headshotUrl}
        alt={talent.name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h3 className="font-display text-xl text-brand-dark mb-1">
          {talent.name}
        </h3>
        <p className="text-neutral-600 text-sm">
          {[talent.playingAge, talent.ethnicity, talent.location]
            .filter(Boolean)
            .join(" • ")}
        </p>

        <Link
          href={`/talent/${talent.slug}`}
          className="mt-4 inline-block text-brand-primary font-medium hover:underline text-sm"
        >
          View Profile →
        </Link>
      </div>
    </article>
  );
}
