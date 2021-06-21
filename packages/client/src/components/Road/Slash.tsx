import clsx from "clsx";
import { CSSProperties } from "react";

type SlashProps = { 
  className?: string
  style?: CSSProperties;
};
export function Slash({ className, style }: SlashProps) {
  return (
    <div
      className={clsx("w-full h-full playerIcon", className)}
      style={{
        ...style,
        backgroundSize: '100% 100%',
        // background: `radial-gradient(circle at 0% 40%, rgba(255, 255, 255, 0.6) 15%, var(--tw-gradient-from) 30% 60%, #000 100%)`,
      }}
    />
  );
}
