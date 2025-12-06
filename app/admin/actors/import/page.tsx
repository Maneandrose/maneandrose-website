import { importFromSpotlightUrl } from "./actions";

export default function ImportActorPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-display font-semibold mb-3">Import actor from Spotlight</h1>
      <p className="text-sm text-neutral-600 mb-6">
        Paste a public Spotlight URL. We&apos;ll fetch the page, parse the CV and create a full actor profile.
      </p>

      <form action={importFromSpotlightUrl} className="space-y-4 bg-white border border-neutral-200 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Spotlight profile URL</label>
          <input
            name="spotlight_url"
            required
            placeholder="https://www.spotlight.com/..."
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          />
          <p className="text-xs text-neutral-600 mt-1">
            Only public Spotlight pages are supported. Please review the imported profile before publishing.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition"
        >
          Import from Spotlight
        </button>
      </form>
    </div>
  );
}
