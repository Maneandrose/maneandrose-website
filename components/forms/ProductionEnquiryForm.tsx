"use client";

import { useState } from "react";

export default function ProductionEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // For now: POST to API route (we will build API next)
    const res = await fetch("/api/production-enquiry", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-700">
        Thank you — your enquiry has been received.{" "}
        A member of the Mane & Rose team will contact you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Production Company */}
      <div>
        <label className="block text-sm font-medium mb-1">Production company</label>
        <input
          name="company"
          required
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Contact Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Your name</label>
        <input
          name="name"
          required
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone number</label>
        <input
          name="phone"
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Project title */}
      <div>
        <label className="block text-sm font-medium mb-1">Project title</label>
        <input
          name="project"
          required
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Casting brief */}
      <div>
        <label className="block text-sm font-medium mb-1">Casting brief / breakdown</label>
        <textarea
          name="brief"
          required
          rows={5}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Usage */}
      <div>
        <label className="block text-sm font-medium mb-1">Usage / Territory / Duration</label>
        <input
          name="usage"
          placeholder="e.g. UK TV + VOD – 12 months"
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Dates */}
      <div>
        <label className="block text-sm font-medium mb-1">Shoot dates / rehearsal dates</label>
        <input
          name="dates"
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-1">Budget / Fees</label>
        <input
          name="budget"
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-full bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition"
      >
        {loading ? "Submitting..." : "Submit enquiry"}
      </button>
    </form>
  );
}

