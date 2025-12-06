import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/talent", label: "Talent" },
  { href: "/about", label: "About" },
  { href: "/for-producers", label: "For producers" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="bg-brand-dark text-white">
      <div className="h-1 bg-brand-primary" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/maneandrose-logo-white.png"
            alt="Mane & Rose Talent Agency"
            width={200}
            height={70}
            priority
            className="w-auto h-12 md:h-14 object-contain"
          />
          <span className="sr-only">Mane & Rose</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="md:hidden text-sm hover:text-brand-primary transition-colors"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
