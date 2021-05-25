import React, { Component }  from 'react';
import clsx from "clsx";

type TabProps = {
  label: string;
  normalImage: string;
  activeImage: string;
  active?: boolean;
  onClick?: () => void;
};
export function Tab({
  label,
  normalImage,
  activeImage,
  active,
  onClick,
}: TabProps) {
  return (
    <button
      className="w-16 text-gray-500 text-xxs font-kai relative z-20"
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
