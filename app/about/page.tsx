import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Who We Are</p>
          <h1 className="heading-hero mb-6">About Mane & Rose</h1>
          <p className="body-light text-lg max-w-2xl mx-auto">
            A boutique talent agency championing exceptional performers across the UK and internationally.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="heading-section">A Different Kind of Agency</h2>
          </div>
          
          <div className="space-y-6 body-default text-center">
            <p>
              Mane & Rose was founded with a simple belief: that exceptional talent deserves exceptional representation. 
              We are a boutique agency that takes a personal approach to every client relationship.
            </p>
            <p>
              Our team brings decades of industry experience, with backgrounds spanning casting, production, 
              and talent management. We understand the business from every angle.
            </p>
            <p>
              We champion individuality, nurture careers and provide tailored support for both new and established talent. 
              Our roster is carefully curated to ensure every artist receives the attention they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="eyebrow mb-4">What We Stand For</p>
            <h2 className="heading-section">Our Values</h2>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <div className="card text-center">
              <h3 className="heading-sub text-brand-dark mb-3">Integrity</h3>
              <p className="body-default">
                Honest, transparent relationships with our talent and the industry.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="heading-sub text-brand-dark mb-3">Excellence</h3>
              <p className="body-default">
                Committed to the highest standards in everything we do.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="heading-sub text-brand-dark mb-3">Individuality</h3>
              <p className="body-default">
                Celebrating what makes each performer unique and remarkable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 md:py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display tracking-tight mb-6">
            Ready to Work With Us?
          </h2>
          <p className="body-light mb-8 md:mb-10">
            Whether you&apos;re seeking representation or looking to cast exceptional talent, 
            we&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/join" className="btn-primary">
              Apply for Representation
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
