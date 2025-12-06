export function Section({
  id,
  eyebrow,
  title,
  className = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <div className="container-page">
        {(eyebrow || title) && (
          <header className="mb-8">
            {eyebrow && (
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-brand-primary mb-1">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-3xl font-display text-neutral-900">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
