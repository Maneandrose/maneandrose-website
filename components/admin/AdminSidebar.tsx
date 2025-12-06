"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "Talent",
    items: [
      { href: "/admin/actors", label: "Actors" },
      // future: { href: "/admin/media", label: "Actor media" },
    ],
  },
  {
    label: "Enquiries",
    items: [
      { href: "/admin/enquiries", label: "Production enquiries" },
      // future: { href: "/admin/messages", label: "Contact messages" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-neutral-50 h-screen sticky top-0 hidden md:flex flex-col">
      <div className="px-4 py-4 border-b border-neutral-200">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Mane &amp; Rose</p>
        <p className="text-sm font-semibold mt-1">Admin dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-4 text-sm">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center rounded-lg px-2 py-1.5 transition-colors",
                        active
                          ? "bg-brand-primary/10 text-brand-primary font-medium"
                          : "text-neutral-700 hover:bg-neutral-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

