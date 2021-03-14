import { ReactComponent as IconSpin } from "assets/spin.svg";

export function PlaceHolder() {
  return (
    <>
      <IconSpin className="text-white h-8 w-8 m-4 animate-spin absolute right-0 bottom-0" />
    </>
  );
}
