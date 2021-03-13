import IMG_Frame from "assets/status/frame.png";

type StatusProps = {
  value?: string;
};
export function Status({ value }: StatusProps) {
  return (
    <div>
      <div className="relative w-44 text-white text-sm">
        <img src={IMG_Frame} alt="status frame" />

        <p className="absolute top-0 pl-12 pb-1 h-full flex items-center">
          {value}
        </p>
      </div>
    </div>
  );
}
