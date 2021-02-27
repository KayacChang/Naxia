import { Canvas } from "core";
import { ReactComponent as IconSpin } from "assets/spin.svg";

type Props = {
  width: number;
  height: number;
};
export function PlaceHolder({ width, height }: Props) {
  return (
    <div className="relative mx-auto">
      <Canvas className="max-w-full" width={width} height={height} />

      <IconSpin className="text-white h-8 w-8 m-4 animate-spin absolute right-0 bottom-0" />
    </div>
  );
}
