import Assets from "assets";

type LocationProps = {
  value: string;
};
export function Location({ value }: LocationProps) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <div className="relative w-52 text-white">
        <img src={Assets.Common.Location} alt="world frame" />

        <h1 className="absolute top-0 h-full w-full flex items-center justify-center text-fansy text-xl tracking-wider">
          {value}
        </h1>
      </div>
    </div>
  );
}
