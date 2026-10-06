type ArrowProps = { className?: string; flip?: boolean };

export function Arrow({ className = '', flip = false }: ArrowProps) {
  return (
    <svg
      className={`sb-arrow ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      viewBox="0 0 120 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 12c28-8 62-6 82 14 12 12 16 22 20 34" />
      <path d="M96 52l12 12 8-16" />
    </svg>
  );
}
