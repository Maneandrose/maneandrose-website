import ProductionEnquiryForm from "@/components/forms/ProductionEnquiryForm";

export const metadata = {
  title: "Casting & Production | Mane & Rose Talent Agency",
  description:
    "Submit casting briefs and production enquiries. Mane & Rose represents exceptional actors, voice artists and commercial performers.",
};

export default function CastingAndProductionPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-brand-primary font-semibold">
            For casting directors & producers
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-display font-semibold">
            Casting & Production Enquiries
          </h1>

          <p className="mt-4 text-base text-neutral-300 max-w-2xl mx-auto">
            Whether you're casting for film, television, commercials or voice work,
            Mane & Rose offers fast responses, tailored suggestions and access to
            exceptional diverse talent across the UK and internationally.
          </p>
        </div>
      </section>

      {/* Why Choose Mane & Rose */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-display font-semibold mb-6">
          Why casting teams choose Mane & Rose
        </h2>

        <div className="grid sm:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div>
            <h3 className="font-semibold mb-2">Fast, accurate casting</h3>
            <p>We respond quickly with curated shortlists that match your brief exactly.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Exceptional diverse talent</h3>
            <p>Our roster includes actors, commercial performers and trained voice artists across all backgrounds.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Transparent usage & fee guidance</h3>
            <p>We help productions set fair usage fees across TV, online, social and international campaigns.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Industry experience</h3>
            <p>We’ve worked with BBC, Netflix, Amazon, Channel 4, Disney+ and leading commercial brands.</p>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-semibold mb-6">
            Submit a casting or production enquiry
          </h2>

          <ProductionEnquiryForm />
        </div>
      </section>
    </div>
  );
}

