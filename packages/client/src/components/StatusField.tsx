import clsx from "clsx";

type StatusFieldProps = {
  className?: string;
  img?: string;
  value?: string;
};
export function StatusField({ className, img, value = "" }: StatusFieldProps) {
  return (
    <div
      className={clsx(
        "bg-black text-white bg-opacity-80 rounded-full relative flex items-center",
        className
      )}
    >
      {img && (
        <img className="absolute bottom-0 w-12" src={img} alt="coin icon" />
      )}

      <h5 className="flex justify-end ml-12 px-4 w-full">{value}</h5>
    </div>
  );
}
