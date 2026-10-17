interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-sans font-bold text-primary tracking-tight select-none lowercase ${
        className || "text-2xl"
      }`}
    >
      holos
    </span>
  );
}
