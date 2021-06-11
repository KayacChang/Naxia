import Assets from "assets";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export function Location({ children }: Props) {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      <div
        className={clsx(
          "relative text-white",
          "flex justify-center items-center",
          "w-52",
          "transform origin-top lg:scale-150"
        )}
      >
        <div>
          <img src={Assets.Common.Location} alt="world frame" />
        </div>

        <h1 className="absolute font-kai text-xl text-fansy tracking-widest">
          {children}
        </h1>
      </div>
    </div>
  );
}
