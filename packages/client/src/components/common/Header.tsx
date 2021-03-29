import { Profile, Status } from "components";

type HeaderProps = {
  avatar: string;
  name: string;
  level: string;
  balance: string;
};
export function Header({ avatar, name, level, balance }: HeaderProps) {
  return (
    <header className="h-10">
      <Profile avatar={avatar} name={name} level={level} />

      <Status value={balance} />
    </header>
  );
}
