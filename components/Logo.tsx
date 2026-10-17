interface LogoProps {
  className?: string;
  colorClass?: string;
}

export default function Logo({
  className = "text-2xl",
  colorClass = "text-primary",
}: LogoProps) {
  return (
    <span
      className={`font-sans font-bold tracking-tight select-none lowercase ${colorClass} ${className}`}
    >
      holos
    </span>
  );
}
