export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Get in Touch</p>
          <h1 className="heading-hero mb-6">Contact Us</h1>
          <p className="body-light text-lg max-w-2xl mx-auto">
            Whether you&apos;re casting, seeking representation, or have a general enquiry — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <p className="eyebrow mb-4">Contact Details</p>
              <h2 className="heading-section mb-6">Reach Out</h2>

              <div className="space-y-6 body-default">
                <div>
                  <h3 className="font-display text-lg text-brand-dark mb-2">General Enquiries</h3>
                  <p>
                    <a href="mailto:info@maneandrose.com" className="text-brand-primary hover:underline">
                      info@maneandrose.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-brand-dark mb-2">Casting & Bookings</h3>
                  <p>
                    <a href="mailto:casting@maneandrose.com" className="text-brand-primary hover:underline">
                      casting@maneandrose.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-brand-dark mb-2">Representation Enquiries</h3>
                  <p>
                    <a href="mailto:submissions@maneandrose.com" className="text-brand-primary hover:underline">
                      submissions@maneandrose.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-brand-dark mb-2">Office Hours</h3>
                  <p>Monday – Friday: 9am – 6pm GMT</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <p className="eyebrow mb-4">Send a Message</p>
              <h2 className="heading-section mb-6">Quick Contact</h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">Name</label>
                  <input type="text" className="filter-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">Email</label>
                  <input type="email" className="filter-input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">Subject</label>
                  <select className="filter-input">
                    <option value="">Select a subject</option>
                    <option value="casting">Casting Enquiry</option>
                    <option value="representation">Representation Enquiry</option>
                    <option value="general">General Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">Message</label>
                  <textarea 
                    className="filter-input min-h-[120px]" 
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
