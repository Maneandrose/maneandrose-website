export default function JoinPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Join Our Roster</p>
          <h1 className="heading-hero mb-6">Seeking Representation</h1>
          <p className="body-light text-lg max-w-2xl mx-auto">
            We&apos;re always looking for exceptional talent to join the Mane & Rose family.
          </p>
        </div>
      </section>

      {/* What We Look For */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">Before You Apply</p>
            <h2 className="heading-section">What We Look For</h2>
          </div>

          <div className="space-y-6 body-default">
            <p>
              We represent actors, voice artists and commercial performers at all stages of their careers. 
              While we can&apos;t take on everyone, we review every application carefully.
            </p>
            <p>
              <strong className="text-brand-dark">Essential requirements:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Professional training or demonstrable experience</li>
              <li>High-quality headshots (no selfies)</li>
              <li>Showreel or self-tape samples</li>
              <li>Right to work in the UK</li>
              <li>Based in the UK (or willing to travel for work)</li>
            </ul>
            <p>
              We particularly welcome applications from underrepresented groups and performers with unique skills.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Placeholder */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">Apply Now</p>
            <h2 className="heading-section">Submit Your Application</h2>
          </div>

          <div className="card">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Full Name</label>
                <input type="text" className="filter-input" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Email</label>
                <input type="email" className="filter-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Phone</label>
                <input type="tel" className="filter-input" placeholder="Your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Spotlight / IMDb Link</label>
                <input type="url" className="filter-input" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Tell Us About Yourself</label>
                <textarea 
                  className="filter-input min-h-[120px]" 
                  placeholder="Your training, experience, what makes you unique..."
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
