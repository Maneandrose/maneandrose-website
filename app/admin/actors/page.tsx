import { supabaseServer } from "@/lib/supabaseServer";

export const metadata = {
  title: "Actors | Mane & Rose Admin",
};

export default async function AdminActorsPage() {
  const supabase = supabaseServer();

  const { data: actors, error } = await supabase.from("actors").select("*").order("full_name", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-semibold">Actors</h1>
          <p className="text-sm text-neutral-600">Manage talent stored in the Supabase database.</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/admin/actors/import"
            className="px-4 py-2 rounded-full border border-neutral-300 text-sm hover:bg-neutral-50 transition"
          >
            Import from Spotlight
          </a>
          <a
            href="/admin/actors/new"
            className="px-4 py-2 rounded-full bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition"
          >
            Add actor
          </a>
        </div>
      </header>

      {/* Empty state */}
      {(!actors || actors.length === 0) && (
        <div className="rounded-xl border border-neutral-200 p-6 text-center text-neutral-600">
          No actors found. Use "Add actor" to create your first entry.
        </div>
      )}

      {/* Actors table */}
      {actors && actors.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Playing Age</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Spotlight</th>
              </tr>
            </thead>

            <tbody>
              {actors.map((actor) => (
                <tr key={actor.id} className="border-b last:border-b-0 border-neutral-200">
                  <td className="px-4 py-2">{actor.full_name}</td>
                  <td className="px-4 py-2">{actor.playing_age}</td>
                  <td className="px-4 py-2">{actor.location}</td>
                  <td className="px-4 py-2">
                    {actor.spotlight_link ? (
                      <a
                        href={actor.spotlight_link}
                        className="text-brand-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

