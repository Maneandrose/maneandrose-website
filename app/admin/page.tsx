export const metadata = {
  title: "Admin Dashboard | Mane & Rose",
};

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-display font-semibold">Dashboard</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Internal view for managing actors, enquiries and site content.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Talent</p>
          <p className="mt-2 text-base font-semibold">Actors</p>
          <p className="text-xs text-neutral-600 mt-1">
            Add, edit and archive talent on the Mane &amp; Rose roster.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Enquiries</p>
          <p className="mt-2 text-base font-semibold">Production enquiries</p>
          <p className="text-xs text-neutral-600 mt-1">
            View briefs submitted via the Casting &amp; Production page.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Status</p>
          <p className="mt-2 text-base font-semibold">MVP build</p>
          <p className="text-xs text-neutral-600 mt-1">
            Schema defined, admin shell created. Next step: connect to Supabase data.
          </p>
        </div>
      </section>
    </div>
  );
}

