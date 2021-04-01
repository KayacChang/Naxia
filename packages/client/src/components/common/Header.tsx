import { Profile, Status } from "components";

import BOSS_NAME from "assets/room/background/boss-name.png";

type BossProfileProps = {
  name: string;
};
function BossProfile({ name }: BossProfileProps) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-52 p-2">
      <div className="relative flex justify-center items-center">
        <img src={BOSS_NAME} alt="boss name" />

        <h1 className="text-white absolute tracking-widest">{name}</h1>
      </div>
    </div>
  );
}

type HeaderProps = {
  avatar: string;
  name: string;
  level: string;
  balance: string;
  boss: string;
};
export function Header({ avatar, name, level, balance, boss }: HeaderProps) {
  return (
    <header className="h-10">
      <Profile avatar={avatar} name={name} level={level} />

      <BossProfile name={boss} />

      <Status value={balance} />
    </header>
  );
}
