import clsx from "clsx";
import React from "react";

type SideButtonProps = {
  label: string;
  img: string;
  onClick: () => void;
};
export default function SideButton({ label, img, onClick }: SideButtonProps) {
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");
  return (
    <div className={clsx("relative", isiPad ? "transform xl:scale-150" : "transform lg:scale-150")}>
      <div className="absolute text-yellow-100 text-shadow tracking-wider bottom-2 right-0 text-sm">
        {label}
      </div>

      <button onClick={onClick}>
        <img src={img} alt={"iii"} />
      </button>
    </div>
  );
}
