import { useHistory } from "react-router";
import { useDungeon } from "system";
import { Button, Road, SystemModal } from "components";
import Assets from "assets";

type DungeonDetailProps = {
  mapID: number;
  dungeonID: number;
  onCancel?: () => void;
};
export function DungeonDetail({
  mapID,
  dungeonID,
  onCancel,
}: DungeonDetailProps) {
  const dungeon = useDungeon(mapID, dungeonID);
  const history = useHistory();

  if (!dungeon) return <></>;

  return (
    <div className="flex flex-col h-full relative font-noto text-white">
      <div className="flex mt-8 relative">
        <img src={Assets.Lobby.Dungeon_Info_Background} alt="info background" />

        <div className="absolute top-0 h-full w-full py-8 flex">
          <div className="w-5/6 h-full flex items-center">
            <Road rounds={dungeon.rounds} />
          </div>

          <div className="w-1/3 h-full flex flex-col pl-2 pr-4">
            <div className="mt-1 relative p-3 flex justify-center items-center">
              <img src={Assets.Lobby.Dungeon_Info_Preview_1} alt="preview" />

              <img
                className="absolute top-0"
                src={Assets.Lobby.Dungeon_Info_Preview_Frame}
                alt="preview frame"
              />
            </div>

            <div className="relative flex justify-center items-center text-yellow-500">
              <img
                src={Assets.Lobby.Dungeon_Info_Name_Frame}
                alt="name background"
              />

              <div className="absolute -mb-1">{dungeon.info.name}</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 flex h-20 text-white ">
        <div className="flex w-1/2 ml-auto mr-8 my-4">
          <Button
            type="img"
            img={Assets.Lobby.Dungeon_Info_Btn_Back}
            className="relative flex items-center"
            onClick={onCancel}
          >
            <div className="absolute w-full mb-1">{"返回"}</div>
          </Button>

          <Button
            type="img"
            img={Assets.Lobby.Dungeon_Info_Btn_Join}
            className="relative flex items-center"
            onClick={() => history.push("/room")}
          >
            <div className="absolute w-full mb-1">{"進入場景"}</div>
          </Button>
        </div>
      </footer>
    </div>
  );
}

export function DungeonConditon() {
  return (
    <SystemModal button="確認" subButton="取消">
      <div className="px-6 py-4">
        <p className="text-white space-x-2">
          <span>解鎖</span>
          <span className="text-yellow-500">水晶湖</span>
          <span>需要達成以下條件:</span>
        </p>

        <div className="px-10 py-4">
          <table className="table-auto w-full">
            <tbody>
              <tr className="text-green-400">
                <th className="font-kai text-left">累積取得哥布林卡片:</th>
                <td className="text-right">30/30</td>
              </tr>

              <tr className="text-red-500">
                <th className="font-kai text-left">累積取得食人獸卡片:</th>
                <td className="text-right">30/30</td>
              </tr>

              <tr className="text-green-400">
                <th className="font-kai text-left">擁有點數:</th>
                <td className="text-right">30/600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SystemModal>
  );
}
