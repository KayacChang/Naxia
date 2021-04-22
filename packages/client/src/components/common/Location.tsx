type LocationProps = {
  frame: string;
  value: string;
};
export function Location({ frame, value }: LocationProps) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <div className="relative w-48 text-white">
        <img src={frame} alt="world frame" />

        <h1 className="absolute top-0 h-full w-full flex items-center justify-center">
          {value}
        </h1>
      </div>
    </div>
  );
}
