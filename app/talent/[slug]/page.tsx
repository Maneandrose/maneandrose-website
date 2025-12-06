import Image from "next/image";
import { notFound } from "next/navigation";
import { TALENT } from "@/data/talent-data";

export async function generateStaticParams() {
  return TALENT.map((t) => ({ slug: t.slug }));
}

export default function ActorProfilePage({ params }: { params: { slug: string } }) {
  const actor = TALENT.find((t) => t.slug === params.slug);

  if (!actor) return notFound();

  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header: Name + Role */}
        <header className="mb-10">
          <p className="text-xs tracking-widest text-brand-primary font-semibold uppercase">
            Mane & Rose Talent
          </p>

          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-semibold">
            {actor.name}
          </h1>

          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            {actor.roleType} · Playing age {actor.playingAge}
          </p>
        </header>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left column — Headshot */}
          <div className="lg:col-span-1">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200">
              <Image src={actor.headshotUrl} alt={actor.name} fill className="object-cover" />
            </div>
          </div>

          {/* Right column — Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <ul className="space-y-1 text-neutral-700 text-sm">
                <li>
                  <strong>Gender:</strong> {actor.gender}
                </li>
                <li>
                  <strong>Ethnicity:</strong> {actor.ethnicity}
                </li>
                <li>
                  <strong>Location:</strong> {actor.location}
                </li>
                <li>
                  <strong>Playing Age:</strong> {actor.playingAge}
                </li>
              </ul>
            </div>

            {/* Spotlight / IMDb / CV buttons */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Links</h2>
              <div className="flex flex-wrap gap-3">
                {actor.spotlight && (
                  <a
                    href={actor.spotlight}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition"
                  >
                    Spotlight Profile
                  </a>
                )}

                {actor.imdb && (
                  <a
                    href={actor.imdb}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full border border-neutral-300 hover:border-neutral-500 transition"
                  >
                    IMDb
                  </a>
                )}

                {actor.cv && (
                  <a
                    href={actor.cv}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full border border-neutral-300 hover:border-neutral-500 transition"
                  >
                    Download CV
                  </a>
                )}
              </div>
            </div>

            {/* Bio / Credits Section */}
            {actor.bio && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Bio</h2>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">{actor.bio}</p>
              </div>
            )}

            {actor.credits && actor.credits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Selected Credits</h2>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {actor.credits.map((credit, i) => (
                    <li key={i}>
                      <strong>{credit.title}</strong> — {credit.type} ({credit.year})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
import { talent } from "@/data/talent";

export default function ActorProfile({ params }: { params: { slug: string } }) {
  const actor = talent.find((t) => t.slug === params.slug);

  if (!actor) return <div className="p-10">Actor not found.</div>;

  return (
    <main>
      <section className="bg-brand-dark text-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={actor.image}
            alt={actor.name}
            className="rounded-xl2 shadow-card object-cover w-full h-[420px]"
          />

          <div className="md:col-span-2">
            <h1 className="font-display text-4xl mb-4">{actor.name}</h1>
            <p className="text-neutral-300 text-sm mb-6">
              {actor.playingAge} • {actor.ethnicity} • {actor.location}
            </p>

            <a
              href="/contact"
              className="inline-block bg-brand-primary px-8 py-3 rounded-full font-medium text-white shadow hover:opacity-90 transition"
            >
              Request Availability
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl text-brand-dark mb-4">
          Credits & Experience
        </h2>
        <p className="text-sm text-neutral-700">
          Full credit list will be implemented once database integration is ready.
        </p>
      </section>
    </main>
  );
}
