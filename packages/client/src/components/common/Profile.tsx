import { Modal, SystemModal } from "components";
import { useState, ReactNode } from "react";
import Assets from "assets";
import { range } from "ramda";
import { User } from "types";
import { useAppDispatch, user as UserSystem, useUser } from "system";
import { format } from "date-fns";

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

type AvatarProps = {
  img: string;
  children?: ReactNode;
  glow?: boolean;
  onClick?: () => void;
};
function Avatar({ img, children, onClick, glow }: AvatarProps) {
  return (
    <div className="w-18 relative">
      <img src={Assets.Common.Avatar_Frame} alt="avatar frame" />

      <button
        className="absolute top-0 p-1 rounded-full overflow-hidden"
        onClick={onClick}
      >
        <img src={img} alt="avatar" />

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
      <div className="grid grid-cols-4 gap-2 place-items-center m-2">
        {Object.entries(AvatarList).map(([key, src]) => (
          <Avatar
            key={key}
            img={src}
            glow={key === current}
            onClick={() => setCurrent(key)}
          />
        ))}
      </div>
    </SystemModal>
  );
}

type HistoryProps = {
  onClose: () => void;
};
function History({ onClose }: HistoryProps) {
  return (
    <SystemModal
      type="history"
      title="詳細紀錄"
      button="確認"
      onConfirm={onClose}
    >
      <div className="h-full mt-6 mb-7 px-4 text-xs text-center flex flex-col">
        <div className="text-yellow-300 flex items-center h-8">
          <div className="w-3/12">派彩時間</div>
          <div className="w-3/12">投注局號</div>
          <div className="w-1/12">投注內容</div>
          <div className="w-3/12">結果</div>
          <div className="w-1/12">有效投注</div>
          <div className="w-1/12">截圖</div>
        </div>

        <div className="text-yellow-50 overflow-scroll pointer-events-auto h-60">
          {range(0, 20).map((key) => (
            <div className="flex p-1" key={key}>
              <div className="w-3/12">
                {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
              </div>
              <div className="w-3/12">{"20210114021820030"}</div>
              <div className="w-1/12">{"莊 99"}</div>
              <div className="w-3/12">
                <span>{"莊 99:莊贏"}</span>
                <span>{"+94.05"}</span>
              </div>
              <div className="w-1/12">{"99.00"}</div>
              <div className="w-1/12">
                <img src={Assets.Common.Avatar_Screen_Shot} alt="screen shot" />
              </div>
            </div>
          ))}
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

  return (
    <>
      <SystemModal title="個人資訊" onClose={onClose}>
        <div className="h-full flex flex-col font-noto text-xs text-white">
          <div className="flex-1 flex items-center px-2 pt-3 space-x-2">
            <Avatar
              img={AvatarList[user.avatar]}
              onClick={() => setChangeAvatarOpen(true)}
            >
              <div className="bg-black bg-opacity-40 w-full pb-1 absolute bottom-0 left-0 flex justify-center text-xxs">
                更換頭像
              </div>
            </Avatar>

            <div className="flex-1 space-y-1">
              <p className="bg-black rounded border border-yellow-400 py-0.5 px-3">
                <span>暱稱: {user.name}</span>
              </p>

              <div className="bg-black rounded py-0.5 space-y-0.5 px-3">
                <p>
                  <span>ID: {user.id}</span>
                </p>

                <p>
                  <span>你的IP: {user.ip}</span>
                </p>
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
                <h3>最近勝負:</h3>

                <div className="grid grid-cols-7 gap-2">
                  {range(0, 7).map((key) => (
                    <button key={key} onClick={() => setHistoryOpen(true)}>
                      <img src={Assets.Common.Avatar_Win} alt="win" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-end">
                <div className="w-32 relative">
                  <img
                    src={Assets.Common.Avatar_Rate_Frame}
                    alt="avatar rate frame"
                  />

                  <div className=" absolute top-0 text-sm h-full px-2 space-x-2 flex items-center">
                    <span>勝率:</span>
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
          <History onClose={() => setHistoryOpen(false)} />
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
          className="relative z-10 text-left text-white w-48"
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
            <h3 className="text-xxs text-sonora">LV.{user.level}</h3>
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
