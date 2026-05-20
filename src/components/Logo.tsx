export default function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const filterClass = tone === "light" ? "brightness-0 invert" : "";
  return (
    <span className="inline-flex min-w-0 items-center">
      <img
        src="/images/pipa-logo.svg"
        alt="PIPA Jewellery"
        className={`block w-auto object-contain transition-all duration-300 hover:opacity-90 ${filterClass} ${
          className || "h-9 sm:h-11 md:h-14 lg:h-16"
        }`}
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
