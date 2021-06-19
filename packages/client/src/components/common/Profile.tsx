import { Modal, SystemModal } from "components";
import { useState, ReactNode, useEffect } from "react";
import Assets from "assets";
import { HistoryRecord, User } from "types";
import {
  selectToken,
  useAppDispatch,
  useAppSelector,
  user as UserSystem,
  useUser,
  system,
} from "system";
import { format } from "date-fns";
import clsx from "clsx";
import { getUserHistory } from "api";
import invariant from "tiny-invariant";

const AvatarList = {
  1: Assets.Common.Avatar_01,
  2: Assets.Common.Avatar_02,
  3: Assets.Common.Avatar_03,
  4: Assets.Common.Avatar_04,
  5: Assets.Common.Avatar_05,
  6: Assets.Common.Avatar_06,
  7: Assets.Common.Avatar_07,
  8: Assets.Common.Avatar_08,
};

type AvatarID = string;

type AvatarProps = {
  id: AvatarID;
  children?: ReactNode;
  glow?: boolean;
  onClick?: () => void;
  className?: string;
};
export function Avatar({
  className,
  id,
  children,
  onClick,
  glow,
}: AvatarProps) {
  return (
    <div className={clsx("relative flex", className)}>
      <div>
        <img src={Assets.Common.Avatar_Frame} alt="avatar frame" />
      </div>

      <button
        className="absolute p-1 rounded-full overflow-hidden"
        onClick={onClick}
      >
        <img src={AvatarList[id]} alt="avatar" />

        {children}
      </button>

      {glow && (
        <img
          src={Assets.Common.Avatar_Glow}
          alt="avatar glow"
          className="absolute top-0 transform scale-105"
        />
      )}
    </div>
  );
}

type ChangeAvatarProps = {
  user: User;
  onConfirm: () => void;
};
function ChangeAvatar({ user, onConfirm }: ChangeAvatarProps) {
  const [current, setCurrent] = useState(() => user.avatar);
  const dispatch = useAppDispatch();

  return (
    <SystemModal
      button="確認"
      onConfirm={() => {
        dispatch(UserSystem.update({ ...user, avatar: current }));

        onConfirm();
      }}
    >
      <div className="grid grid-cols-4 gap-2 place-items-center m-2 px-6 xl:px-8">
        {Object.keys(AvatarList).map((key) => (
          <Avatar
            key={key}
            id={key}
            glow={key === current}
            onClick={() => setCurrent(key)}
          />
        ))}
      </div>
    </SystemModal>
  );
}

function useHistory() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    invariant(token, "Unauthorized");
    dispatch(system.loading(true));

    getUserHistory(token).then((res) => {
      dispatch(system.loading(false));
      setHistory(res);
    });
  }, [token, dispatch]);

  return history;
}

type HistoryProps = {
  history: HistoryRecord[];
  onClose: () => void;
};
function History({ history, onClose }: HistoryProps) {
  return (
    <SystemModal
      type="history"
      title="詳細紀錄"
      button="確認"
      onConfirm={onClose}
    >
      <div className="flex h-full items-center justify-center w-full">
        <div
          className={clsx(
            "flex flex-col h-5/6 lg:text-xl text-center text-xs w-full px-2",
            "text-xs lg:text-xl"
          )}
        >
          <div className="text-yellow-300 flex items-center h-1/10">
            <div className="w-3/12">派彩時間</div>
            <div className="w-2/12">投注局號</div>
            <div className="flex-1">投注內容</div>
            <div className="w-4/12">結果</div>
            <div className="flex-1">有效投注</div>
          </div>

          <div
            className="text-yellow-50 overflow-auto pointer-events-auto"
            style={{ height: `${88}%` }}
          >
            {history.map(
              ({ created, round, betDetail, detail, result, bet }) => (
                <div className="flex p-1 h-1/10 items-center" key={round}>
                  <div className="w-3/12">
                    {format(created, "yyyy-MM-dd HH:mm:ss")}
                  </div>
                  <div className="w-2/12">{round}</div>
                  <div className="flex-1">{betDetail}</div>
                  <div className="w-4/12 truncate">
                    <span>{detail}</span>
                    <span>{String(result)}</span>
                  </div>
                  <div className="flex-1">{bet}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </SystemModal>
  );
}

type DetailProps = {
  user: User;
  onClose: () => void;
};
function Detail({ user, onClose }: DetailProps) {
  const [isChangeAvatarOpen, setChangeAvatarOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <SystemModal title="個人資訊" onClose={onClose}>
        <div className="h-full flex flex-col font-noto text-xs text-white z-10">
          <div className="flex-1 flex items-center p-4 space-x-2">
            <Avatar
              className="w-1/5"
              id={user.avatar as AvatarID}
              onClick={() => setChangeAvatarOpen(true)}
            >
              <div
                className={clsx(
                  "bg-black bg-opacity-40 w-full pb-1 absolute bottom-0 left-0 flex justify-center",
                  "text-xxs lg:text-base"
                )}
              >
                更換頭像
              </div>
            </Avatar>

            <div className={clsx("flex-1 space-y-2", "lg:text-xl")}>
              <div className="bg-black rounded border border-yellow-400 py-0.5 px-3">
                <span className="text-fansy">暱稱: </span>
                <span>{user.name}</span>
              </div>

              <div className="bg-black rounded py-0.5 space-y-0.5 px-3">
                <div>
                  <span className="text-fansy">ID: </span>
                  <span>{user.id}</span>
                </div>

                <div>
                  <span className="text-fansy">你的IP: </span>
                  <span>{user.ip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-0.5 relative">
            <img
              src={Assets.Common.Modal_Frame_Inner_Bottom}
              alt="modal frame inner bottom"
            />

            <div className="absolute top-0 w-full h-full flex flex-col-reverse">
              <div className="mt-auto space-y-2 p-2">
                <h3 className="lg:text-xl text-fansy">最近勝負:</h3>

                <div className="grid grid-cols-7 gap-2">
                  {history.slice(0, 7).map(({ resultType, round }) => (
                    <button key={round} onClick={() => setHistoryOpen(true)}>
                      <img
                        src={
                          resultType === "win"
                            ? Assets.Common.Avatar_Win
                            : Assets.Common.Avatar_Lose
                        }
                        alt="result"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-end">
                <div
                  className={clsx(
                    "w-32 relative",
                    "transform origin-bottom-left scale-150"
                  )}
                >
                  <img
                    src={Assets.Common.Avatar_Rate_Frame}
                    alt="avatar rate frame"
                  />

                  <div className=" absolute top-0 text-sm h-full px-2 space-x-2 flex items-center">
                    <span className="text-fansy">勝率:</span>
                    <span>95.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SystemModal>

      {isChangeAvatarOpen && (
        <Modal onClose={() => setChangeAvatarOpen(false)}>
          <ChangeAvatar
            user={user}
            onConfirm={() => setChangeAvatarOpen(false)}
          />
        </Modal>
      )}

      {isHistoryOpen && (
        <Modal>
          <History history={history} onClose={() => setHistoryOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export function Profile() {
  const user = useUser();
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);

  if (!user) return <></>;

  return (
    <>
      <div className="absolute left-0 pt-1 pl-3 z-40">
        <button
          className={clsx(
            "relative z-10 text-left text-white w-48",
            "transform origin-top-left lg:scale-150"
          )}
          onClick={() => setPersonalInfoOpen(true)}
        >
          <img src={Assets.Common.Profile} alt="profile frame" />

          {user.avatar && (
            <div className="absolute top-0 m-1 -z-10 w-16 rounded-full overflow-hidden">
              <img
                src={AvatarList[user.avatar]}
                alt={`${user.name}'s avatar`}
              />
            </div>
          )}

          <div className="absolute top-0 w-full pl-17 m-2 flex flex-col space-y-1">
            <h2 className="text-sm">{user.name}</h2>
            <h3 className="text-xxs text-fansy">LV.{user.level}</h3>
          </div>
        </button>
      </div>

      {isPersonalInfoOpen && (
        <Modal onClose={() => setPersonalInfoOpen(false)}>
          <Detail user={user} onClose={() => setPersonalInfoOpen(false)} />
        </Modal>
      )}
    </>
  );
}
