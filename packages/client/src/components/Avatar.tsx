import IMG_Frame from "assets/profile/frame.png";

type ProfileProps = {
  avatar: string;
  name: string;
  level: string;
};
export function Profile({ avatar, name, level }: ProfileProps) {
  return (
    <div className="relative z-10 text-white w-52">
      <img src={IMG_Frame} alt="profile frame" />

      <div className="absolute top-0 my-1 mx-2 -z-10 w-16 rounded-full overflow-hidden">
        <img src={avatar} alt={`${name}'s avatar`} />
      </div>

      <h2 className="absolute top-2 left-16 py-0.5 px-3 text-sm">{name}</h2>
      <h3 className="absolute top-8 left-20 py-1 text-xxs">{level}</h3>
    </div>
  );
}
