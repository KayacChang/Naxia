import React from "react";
import Assets from "assets";
import clsx from "clsx";

type ContinueProps = {
  className?: string;
  text: string;
};
export function Continue({ className, text }: ContinueProps) {
  return (
    <div
      className={clsx(
        "w-60 relative flex justify-center items-center",
        className
      )}
    >
      <img src={Assets.Room.Result_Continue} alt="continue background" />

      <span className="absolute text-white text-xl">{text}</span>
    </div>
  );
}
