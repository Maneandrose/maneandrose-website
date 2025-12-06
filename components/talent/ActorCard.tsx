"use client";

import Link from "next/link";

export interface Actor {
  name: string;
  slug: string;
  image: string;
  playingAge: string;
  ethnicity: string;
  location: string;
}

export default function ActorCard({ actor }: { actor: Actor }) {
  return (
    <article className="rounded-xl2 overflow-hidden shadow-card bg-white hover:shadow-card-hover transition-shadow duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={actor.image}
        alt={actor.name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h3 className="font-display text-xl text-brand-dark mb-1">
          {actor.name}
        </h3>

        <p className="text-neutral-600 text-sm mb-3">
          {actor.playingAge} • {actor.ethnicity} • {actor.location}
        </p>

        <Link
          href={`/talent/${actor.slug}`}
          className="text-brand-primary text-sm font-medium hover:underline"
        >
          View Profile →
        </Link>
      </div>
    </article>
  );
}
