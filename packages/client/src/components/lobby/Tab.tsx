import React from "react";
import clsx from "clsx";

type TabProps = {
  label: string;
  normalImage: string;
  activeImage: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};
export function Tab({
  label,
  normalImage,
  activeImage,
  active,
  onClick,
  className,
}: TabProps) {
  return (
    <button
      className={clsx(
        "text-gray-500 font-kai relative z-20",
        " text-xxs lg:text-lg",
        className
      )}
      onClick={onClick}
    >
      <img className="w-full" src={normalImage} alt="tab normal" />

      {active && (
        <img
          className="absolute top-1/2 left-0 transform -translate-y-1/2"
          src={activeImage}
          alt="tab active"
        />
      )}

      <span
        className={clsx(
          "absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap",
          active && "text-white"
        )}
      >
        {label}
      </span>
    </button>
  );
}
