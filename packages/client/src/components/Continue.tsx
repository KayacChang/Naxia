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
        "relative flex justify-center items-center",
        "w-60 lg:w-80",
        className
      )}
    >
      <img src={Assets.Room.Result_Continue} alt="continue background" />

      <span
        className={clsx(
          "absolute text-white",
          "text-xl lg:text-3xl xl:text-4xl"
        )}
      >
        {text}
      </span>
    </div>
  );
}
