import clsx from "clsx";

type AvatarProps = {
  className?: string;
  img: string;
  name: string;
  level: string;
};
export function Avatar({ className, img, name, level }: AvatarProps) {
  return (
    <figure
      className={clsx("bg-black bg-opacity-80 text-white flex", className)}
    >
      <div className="w-14">
        <img src={img} alt="avatar img" />
      </div>

      <figcaption className="flex flex-col flex-1">
        <span className="flex-1">{name}</span>
        <span className="flex-1">{level}</span>
      </figcaption>
    </figure>
  );
}
