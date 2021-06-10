import { useHistory } from "react-router";
import { useAppDispatch, useDungeon, Dungeon, useMap } from "system";
import { Button, LobbyRoad as Road, Modal, SystemModal } from "components";
import Assets from "assets";
import { useEffect } from "react";
import clsx from "clsx";
import { currency } from "utils";

type DataFieldProps = {
  className?: string;
  title: string;
  value: string;
};
function DataField({ className, title, value }: DataFieldProps) {
  return (
    <div className={clsx("space-x-1", className)}>
      <strong className="font-kai text-fansy text-shadow-xl filter contrast-125">
        {title}:
      </strong>
      <span className="text-yellow-600">{value}</span>
    </div>
  );
}

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
      <div className="flex flex-col h-full relative text-white">
        <div className="flex items-center mt-8 relative">
          <div>
            <img
              src={Assets.Lobby.Dungeon_Info_Background}
              alt="info background"
            />
          </div>

          <div className="absolute h-full lg:h-5/6 w-full py-8 flex">
            <div
              className={clsx(
                "flex flex-col h-full items-center justify-end relative w-5/6 gap-1",
                "px-4"
              )}
            >
              <div
                className={clsx(
                  "absolute top-0 w-2/5 lg:w-2/6",
                  "transform -translate-y-1/3 lg:-mt-2"
                )}
              >
                <div className="relative flex justify-center items-center">
                  <img
                    src={Assets.Lobby.Dungeon_Info_Name_Frame}
                    alt="name frame"
                  />

                  <div
                    className={clsx("absolute w-full h-full px-1/10 pt-1/16")}
                  >
                    <h2
                      className={clsx(
                        "font-kai text-fansy text-shadow-xl filter contrast-125 text-center",
                        "lg:text-2xl xl:text-3xl tracking-widest"
                      )}
                    >
                      {info.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="absolute transform -translate-y-2/3 w-11/12">
                  <div className="relative flex justify-center items-center">
                    <img
                      src={Assets.Lobby.Dungeon_Info_Info_Frame}
                      alt="info frame"
                    />

                    <div
                      className={clsx(
                        "absolute flex flex-wrap justify-center",
                        "text-xs lg:text-lg xl:text-2xl"
                      )}
                    >
                      <DataField
                        className="w-1/3"
                        title="遊戲局號"
                        value={"-"}
                      />
                      <DataField
                        className="w-1/3"
                        title="遊戲編號"
                        value={"-"}
                      />
                      <DataField
                        className="w-1/3"
                        title="荷官名稱"
                        value={"-"}
                      />
                      <DataField
                        className="w-1/3"
                        title="房間人數"
                        value={"-"}
                      />
                      <DataField
                        className="w-1/3"
                        title="下注限紅"
                        value={"-"}
                      />
                    </div>
                  </div>
                </div>

                <Road rounds={rounds} />
              </div>

              <div className="pb-1 relative flex items-center lg:w-2/3">
                <img
                  src={Assets.Lobby.Dungeon_Info_Bet_Frame}
                  alt="bet frame"
                />

                <div
                  className={clsx(
                    "absolute w-full flex px-1/16",
                    "lg:text-lg xl:text-3xl"
                  )}
                >
                  <DataField
                    className="flex-1"
                    title="當局下注量"
                    value={currency(info.currentBet || 0)}
                  />

                  <DataField
                    className="flex-1"
                    title="累積下注量"
                    value={currency(info.historyBet || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="w-1/4 h-full flex flex-col justify-center pl-2 pr-4">
              <div className="mt-1 relative flex justify-center items-center">
                <img
                  className="p-1/12"
                  src={info.preview || Assets.Lobby.Dungeon_Info_Preview_1}
                  alt="preview"
                />

                <img
                  className="absolute"
                  src={Assets.Lobby.Dungeon_Info_Preview_Frame}
                  alt="preview frame"
                />
              </div>

              <div className="relative flex justify-center items-center">
                <img
                  src={Assets.Lobby.Dungeon_Info_ID_Frame}
                  alt="id background"
                />

                <div className="absolute -mb-1 font-kai text-sm lg:text-xl xl:text-3xl">
                  <span className="text-fansy text-shadow-xl filter contrast-125">
                    桌台編號:
                  </span>
                  <span>百家樂-{info.id}</span>
                </div>
              </div>
            </div>
          </div>

          <footer
            className={clsx(
              "absolute bottom-0 flex text-white w-full",
              "transform translate-y-1/2",
              "text-xs lg:text-lg xl:text-3xl"
            )}
          >
            <div className="flex ml-auto mr-8 w-1/3">
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
      </div>
    </Modal>
  );
}

export function DungeonCondition() {
  const dispatch = useAppDispatch();
  const map = useMap();
  const { info, conditions } = useDungeon();

  if (!info || !conditions || !info.lock) return <></>;

  const pass = conditions.every(({ accumulate, count }) => count >= accumulate);

  return (
    <Modal className="z-10" onClose={() => dispatch(Dungeon.modal.close())}>
      <SystemModal
        button="確認"
        subButton="取消"
        disalbeButton={!pass}
        onConfirm={async () => {
          if (!pass) return;

          await dispatch(Dungeon.unlock({ mapID: map.id, dungeonID: info.id }));

          dispatch(Dungeon.anim.play(info.id));

          dispatch(Dungeon.modal.close());
        }}
        customFunc={() => dispatch(Dungeon.modal.close())}
      >
        <div className="px-6 py-4 text-base lg:text-2xl">
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
