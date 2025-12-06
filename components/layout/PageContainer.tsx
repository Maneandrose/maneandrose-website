export function PageContainer({
    className = "",
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className={`container-page ${className}`}>
        {children}
      </div>
    );
  }
  