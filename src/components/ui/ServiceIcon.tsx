"use client";

interface ServiceIconProps {
  pathData: string;
  className?: string;
  size?: number;
}

/** Renders a service icon from SVG path data */
export default function ServiceIcon({
  pathData,
  className = "",
  size = 40,
}: ServiceIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={pathData} />
    </svg>
  );
}
