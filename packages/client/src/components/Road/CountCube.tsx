import clsx from "clsx";

type CountCubePorps = {
  cubeClassName: string;
  color: string;
  role: string;
  count: number;
};
export function CountCube({
  cubeClassName,
  color,
  role,
  count,
}: CountCubePorps) {
  return (
    <div className="flex items-center">
      <div className={clsx("font-kai", cubeClassName)}>{role}</div>
      <p className={clsx("px-4", color)}>{count}</p>
    </div>
  );
}
