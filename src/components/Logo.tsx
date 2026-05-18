export default function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const text = tone === "dark" ? "text-foreground" : "text-ivory";
  return (
    <span className={`inline-flex items-center gap-1.5 sm:gap-2.5 min-w-0 ${className}`}>
      {/* Diamond mark */}
      <svg
        viewBox="0 0 32 32"
        className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="pipaGold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.08 82)" />
            <stop offset="60%" stopColor="oklch(0.72 0.13 75)" />
            <stop offset="100%" stopColor="oklch(0.55 0.1 60)" />
          </linearGradient>
        </defs>
        <path d="M16 2 L30 12 L16 30 L2 12 Z" stroke="url(#pipaGold)" strokeWidth="1.4" />
        <path
          d="M2 12 H30 M16 2 L10 12 L16 30 M16 2 L22 12 L16 30"
          stroke="url(#pipaGold)"
          strokeWidth="1"
        />
      </svg>
      <span
        className={`font-display text-[0.62rem] xs:text-xs sm:text-[1.05rem] lg:text-[1.45rem] tracking-[0.14em] sm:tracking-[0.3em] whitespace-nowrap truncate ${text}`}
      >
        PIPA<span className="text-gold mx-0.5">·</span>JEWELLERY
      </span>
    </span>
  );
}
