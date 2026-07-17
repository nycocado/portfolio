import type { ReactNode } from "react";

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`relative inline-block font-display text-3xl md:text-4xl font-bold text-gruvbox-yellow ${className}`}
    >
      {children}
      <svg
        className="absolute left-0 top-full mt-1 text-gruvbox-yellow"
        width={130}
        height={9}
        viewBox="0 0 180 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="hp-underline"
          d="M3 8 C 30 3, 55 10, 85 6 S 145 3, 177 7"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </svg>
    </h2>
  );
}
