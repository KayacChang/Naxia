type StatusProps = {
  frame: string;
  value: string;
};
export function Status({ frame, value }: StatusProps) {
  return (
    <div className="absolute right-0 p-2">
      <div className="relative w-44 text-white text-sm">
        <img src={frame} alt="status frame" />

        <p className="absolute top-0 pl-12 pb-1 h-full flex items-center">
          {value}
        </p>
      </div>
    </div>
  );
}
