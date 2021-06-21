import clsx from "clsx";
import { ReactNode, CSSProperties } from "react";

type CircleProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Circle({ className, style, children }: CircleProps) {
  const cssObj = {
    ...style,
  }

  if (!style?.backgroundImage) cssObj.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), var(--tw-gradient-from) 30%, #000)';
  
  return (
    <div
      className={clsx("rounded-full playerIcon", className)}
      style={cssObj}
    >
      {children}
    </div>
  );
}
