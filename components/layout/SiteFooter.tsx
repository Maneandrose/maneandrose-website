import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-neutral-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          {/* Brand & Copyright */}
          <div>
            <p className="font-display text-white text-lg mb-2">Mane & Rose</p>
            <p className="text-sm">
              © {year} Mane & Rose Talent Agency. All rights reserved.
            </p>
          </div>

          {/* Tagline */}
          <p className="text-sm text-neutral-500 max-w-sm">
            Representation for actors, voice artists & commercial performers across the UK and internationally.
          </p>

          {/* Footer Links */}
          <nav className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
