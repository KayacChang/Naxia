import Assets from "assets";

const icon = {
  key: "mailbox",
  icons: {
    normal: Assets.Common.Sidebar_Mailbox,
  },
  href: "#",
};
export function Mailbox() {
  return (
    <>
      <div className="relative">
        <div className="absolute text-fansy bottom-2 right-0">郵箱</div>
        <button className="" onClick={() => {}}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>
      <div className="absolute left-0"></div>
    </>
  );
}
