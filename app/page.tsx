import Link from "next/link";

const industryCategories = [
  {
    title: "Advertising & Commercial",
    desc: "TV commercials, online campaigns, brand ambassadors, high-profile marketing projects.",
  },
  {
    title: "Film & Television",
    desc: "Feature films, drama series, studio productions, shorts and independent projects.",
  },
  {
    title: "Corporate & Business",
    desc: "Internal comms, training videos, presentations, brand explainers and corporate media.",
  },
  {
    title: "Gaming & Motion Capture",
    desc: "Video game character voices, mocap and performance capture sessions.",
  },
  {
    title: "Audio & Voiceover",
    desc: "Radio ads, narrative, audiobooks, e-learning and documentary narration.",
  },
  {
    title: "Digital & Social Content",
    desc: "UGC, branded social campaigns, influencer-style performance for online platforms.",
  },
];

const brandLogos = [
  { src: "/brands/bbc.svg", alt: "BBC" },
  { src: "/brands/netflix.svg", alt: "Netflix" },
  { src: "/brands/amazon.svg", alt: "Amazon" },
  { src: "/brands/disney.svg", alt: "Disney+" },
  { src: "/brands/nike.svg", alt: "Nike" },
  { src: "/brands/channel4.svg", alt: "Channel 4" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">London-Based Talent Agency</p>
          <h1 className="heading-hero mb-6">
            Mane & Rose
          </h1>
          <p className="body-light text-lg max-w-2xl mx-auto mb-8 md:mb-10">
            Representing exceptional actors, voice artists and commercial performers across the UK and internationally.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/talent" className="btn-primary">
              Browse Talent
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE'VE WORKED WITH – BRAND STRIP */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Trusted By</p>
          <h2 className="heading-section mb-8 md:mb-10">
            Who We&apos;ve Worked With
          </h2>

          {/* Logo row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-center">
            {brandLogos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.alt}
                src={logo.src}
                className="h-8 md:h-10 mx-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH – CATEGORY GRID */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">Our Expertise</p>
            <h2 className="heading-section">
              Who We Work With
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industryCategories.map((cat) => (
              <div key={cat.title} className="card">
                <h3 className="heading-sub text-brand-dark mb-2">
                  {cat.title}
                </h3>
                <p className="body-default">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER SECTION */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="heading-section mb-6">About Mane & Rose</h2>
          <p className="body-default leading-relaxed mb-8">
            Mane & Rose is a boutique talent agency representing exceptional actors,
            voiceover artists and commercial performers across the UK and internationally.
            We champion individuality, nurture careers and provide tailored support for
            both new and established talent.
          </p>

          <Link href="/about" className="btn-primary">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-brand-dark py-16 md:py-20 text-center text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-display tracking-tight mb-6">
            Work With Our Talent
          </h2>
          <p className="body-light max-w-2xl mx-auto mb-8 md:mb-10">
            Whether you&apos;re casting for film, television, commercials, voiceover or digital media,
            Mane & Rose provides exceptional talent and a smooth casting experience.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/talent" className="btn-primary">
              Browse Talent
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
