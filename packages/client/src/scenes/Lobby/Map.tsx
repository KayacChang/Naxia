import React from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useDungeon, Dungeon, useMap } from "system";
import { Button, LobbyRoad as Road, Modal, SystemModal } from "components";
import Assets from "assets";
import { useEffect } from "react";
import clsx from "clsx";

export function DungeonDetail() {
  const dispatch = useAppDispatch();
  const map = useMap();
  const { info, rounds } = useDungeon();
  const history = useHistory();

  useEffect(() => {
    if (!info?.id) return;

    const id = setInterval(() => {
      dispatch(Dungeon.get.rounds({ mapID: map.id, dungeonID: info.id }));
    }, 30 * 1000);

    return () => clearInterval(id);
  }, [map.id, info?.id, dispatch]);

  if (!info || !rounds || info.lock) return <></>;

  return (
    <Modal className="z-10">
      <div className="flex flex-col h-full relative font-noto text-white">
        <div className="flex mt-8 relative">
          <div>
            <img
              src={Assets.Lobby.Dungeon_Info_Background}
              alt="info background"
            />
          </div>

          <div className="absolute top-0 h-full w-full py-8 flex">
            <div className="w-5/6 h-full flex items-center">
              <Road rounds={rounds} />
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

                <div className="absolute -mb-1">{info.name}</div>
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
              onClick={() => dispatch(Dungeon.modal.close())}
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
    </Modal>
  );
}

export function DungeonCondition() {
  const dispatch = useAppDispatch();
  const map = useMap();
  const { info, conditions } = useDungeon();

  if (!info || !conditions || !info.lock) return <></>;

  const pass = conditions.every(({ accumulate, count }) => count > accumulate);

  return (
    <Modal>
      <SystemModal
        button="確認"
        subButton="取消"
        disalbeButton={!pass}
        onConfirm={async () => {
          if (!pass) return;

          await dispatch(Dungeon.unlock({ mapID: map.id, dungeonID: info.id }));

          dispatch(Dungeon.modal.close());
        }}
        customFunc={() => dispatch(Dungeon.modal.close())}
      >
        <div className="px-6 py-4">
          <p className="text-white space-x-2">
            <span>解鎖</span>
            <span className="text-yellow-500">{info.name}</span>
            <span>需要達成以下條件:</span>
          </p>
          <div className="py-4">
            <table className="table-auto w-full">
              <tbody>
                {conditions.map((condition, index) => (
                  <tr
                    className={clsx(
                      condition.achieve ? "text-green-400" : "text-red-500"
                    )}
                    key={index}
                  >
                    <th className="font-kai text-left">
                      {condition.item
                        ? `累積取得${condition.item}:`
                        : `擁有點數:`}
                    </th>

                    <td className="text-right">{`${condition.count} / ${condition.accumulate}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SystemModal>
    </Modal>
  );
}
