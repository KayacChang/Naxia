import clsx from "clsx";

type SlashProps = { className?: string };
export function Slash({ className }: SlashProps) {
  return (
    <div
      className={clsx("rounded w-1/3 h-full transform rotate-45", className)}
      style={{
        background: `radial-gradient(circle at 0% 40%, rgba(255, 255, 255, 0.6) 15%, var(--tw-gradient-from) 30% 60%, #000 100%)`,
      }}
    />
  );
}
