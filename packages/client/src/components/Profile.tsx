import IMG_Frame from "assets/profile/frame.png";

type ProfileProps = {
  avatar: string;
  name: string;
  level: string;
};
export function Profile({ avatar, name, level }: ProfileProps) {
  return (
    <div className="relative z-10 text-white w-48">
      <img src={IMG_Frame} alt="profile frame" />

      <div className="absolute top-0 m-1 -z-10 w-16 rounded-full overflow-hidden">
        <img src={avatar} alt={`${name}'s avatar`} />
      </div>

      <div className="absolute top-0 w-full pl-16 m-2 flex flex-col space-y-1">
        <h2 className="text-sm">{name}</h2>
        <h3 className="text-xxs">{level}</h3>
      </div>
    </div>
  );
}
