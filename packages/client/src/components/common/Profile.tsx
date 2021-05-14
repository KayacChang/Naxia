import { Modal, SystemModal } from "components";
import { useState, ReactNode } from "react";
import Assets from "assets";
import { range } from "ramda";
import { User } from "types";
import { useAppDispatch, user as UserSystem } from "system";

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

type ProfileProps = {
  user: User;
};
export function Profile({ user }: ProfileProps) {
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [isChangeAvatarOpen, setChangeAvatarOpen] = useState(false);

  return (
    <>
      <div className="absolute left-0 pt-1 pl-3 z-50">
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
            <h3 className="text-xxs text-fansy">LV.{user.level}</h3>
          </div>
        </button>
      </div>

      {isPersonalInfoOpen && (
        <Modal onClose={() => setPersonalInfoOpen(false)}>
          <SystemModal
            title="個人資訊"
            onClose={() => setPersonalInfoOpen(false)}
          >
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
                        <img
                          key={key}
                          src={Assets.Common.Avatar_Win}
                          alt="win"
                        />
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
        </Modal>
      )}

      {isChangeAvatarOpen && (
        <Modal onClose={() => setChangeAvatarOpen(false)}>
          <ChangeAvatar
            user={user}
            onConfirm={() => setChangeAvatarOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
