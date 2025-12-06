import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-block px-8 py-3 rounded-full font-medium transition duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary",
        {
          primary: "bg-brand-primary text-white shadow hover:opacity-90",
          secondary: "border border-neutral-300 bg-white text-neutral-900 hover:text-brand-primary hover:border-brand-primary",
          outline: "border border-neutral-300 text-white hover:bg-white hover:text-brand-dark",
          ghost: "text-neutral-700 hover:text-brand-primary",
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
