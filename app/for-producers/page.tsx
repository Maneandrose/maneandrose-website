import Link from "next/link";

export default function ForProducersPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">For Industry</p>
          <h1 className="heading-hero mb-6">For Producers & Casting</h1>
          <p className="body-light text-lg max-w-2xl mx-auto">
            Streamlined casting, exceptional talent, professional service.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">Our Services</p>
            <h2 className="heading-section">How We Support Your Production</h2>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Rapid Response</h3>
              <p className="body-default">
                Quick turnaround on availability checks and self-tape requests. We understand production timelines.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Curated Submissions</h3>
              <p className="body-default">
                We only submit talent who genuinely fit your brief. No spam, no time-wasting.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Professional Materials</h3>
              <p className="body-default">
                High-quality headshots, showreels and self-tapes. Our talent is always camera-ready.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Clear Communication</h3>
              <p className="body-default">
                One point of contact, clear fee structures, no hidden surprises.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Diverse Roster</h3>
              <p className="body-default">
                Authentic representation across age, ethnicity, ability and background.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-sub text-brand-dark mb-3">Industry Knowledge</h3>
              <p className="body-default">
                We understand rates, contracts and industry standards. Smooth negotiations guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-mid py-16 md:py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display tracking-tight mb-6">
            Looking for Talent?
          </h2>
          <p className="body-light mb-8 md:mb-10">
            Send us your brief and we&apos;ll respond with suitable talent within 24 hours.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/talent" className="btn-primary">
              Browse Our Roster
            </Link>
            <Link href="/contact" className="btn-secondary">
              Send a Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
