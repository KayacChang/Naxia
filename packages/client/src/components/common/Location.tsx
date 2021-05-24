import Assets from "assets";

type LocationProps = {
  value: string;
};
export function Location({ value }: LocationProps) {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      <div className="relative w-52 text-white flex justify-center items-center">
        <div>
          <img src={Assets.Common.Location} alt="world frame" />
        </div>

        <h1 className="absolute font-kai text-xl text-fansy tracking-widest">
          {value}
        </h1>
      </div>
    </div>
  );
}
