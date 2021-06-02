import React from "react";
import clsx from "clsx";
import { UI, Game } from "layers";
import { ReactNode, useEffect, useState, FormEvent, useCallback } from "react";
import {
  BGM,
  getAssets,
  useAppDispatch,
  user,
  useUserError,
  useViewport,
  ViewportProvider,
} from "system";
import { useHistory } from "react-router";
import Assets from "assets";
import { Modal, Spine, SystemModal } from "components";
import Sound from "assets/sound";

type InputFieldProps = {
  type?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};
function InputField({
  type = "text",
  placeholder,
  className,
  onChange,
}: InputFieldProps) {
  const [isFocus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const hasValue = value.length > 0;

  useEffect(() => onChange?.(value), [value, onChange]);

  return (
    <div
      className={clsx("relative", className)}
      onFocusCapture={() => setFocus(true)}
      onBlurCapture={() => setFocus(false)}
    >
      <img src={Assets.Login.Login_Form} alt="input's background" />

      <div className="absolute top-0 w-full h-full px-12 flex justify-center items-center">
        <span
          className={clsx(
            "absolute transition-opacity duration-200",
            isFocus || hasValue ? "opacity-0" : "opacity-100"
          )}
          style={{ color: `rgb(${140}, ${120}, ${70})` }}
        >
          {placeholder}
        </span>

        <input
          className="bg-transparent w-full"
          type={type}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </div>
  );
}

type SubmitProps = {
  className?: string;
  children?: ReactNode;
};
function Submit({ className, children }: SubmitProps) {
  return (
    <button className={clsx("relative ", className)}>
      <img src={Assets.Login.Login_Submit} alt="submit button" />

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <span>{children}</span>
      </div>
    </button>
  );
}

function Form() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useUserError();

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!username || !password) return;

      const action = await dispatch(user.auth({ username, password }));

      if (user.auth.fulfilled.match(action)) {
        return history.push("/lobby");
      }
    },
    [dispatch, history, username, password]
  );

  return (
    <form
      className={clsx(
        "mt-32 font-kai",
        "flex flex-col items-center justify-center",
        "gap-4 lg:gap-8",
        "w-2/5 lg:w-1/5",
        "text-base lg:text-2xl"
      )}
      onSubmit={onSubmit}
    >
      <InputField placeholder="輸入帳號" onChange={setUsername} />

      <InputField
        placeholder="輸入密碼"
        onChange={setPassword}
        type="password"
      />

      <Submit className="mx-14">{"登入"}</Submit>

      <div className="flex justify-between w-full">
        <a className="text-shadow-md" href="/">
          {"還沒有帳號?"}
        </a>

        <a
          className="text-fansy text-shadow-xl underline filter brightness-150"
          href="/"
        >
          {"申請帳號"}
        </a>
      </div>

      {error && (
        <Modal className="z-20">
          <SystemModal
            subButton="返回"
            customFunc={() => dispatch(user.error.clear())}
            onClose={() => dispatch(user.error.clear())}
          >
            <p className="w-full h-full flex justify-center items-center text-white text-lg">
              {error}
            </p>
          </SystemModal>
        </Modal>
      )}
    </form>
  );
}

function View() {
  const { width, height, scale } = useViewport();

  return (
    <Game className="fixed">
      <Spine
        data={getAssets("Login_Spine")}
        x={width / 2}
        y={height / 2}
        scale={scale}
        mount={(spine) => spine.state.setAnimation(0, "animation", true)}
      />
    </Game>
  );
}

export default function Login() {
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(BGM.play(Sound.Login.BGM)), [dispatch]);

  return (
    <ViewportProvider>
      <UI>
        <img src={Assets.Login.Login_Background} alt="background" />
      </UI>

      <View />

      <UI className="flex flex-col items-center justify-center text-white font-noto space-y-4">
        <Form />
      </UI>
    </ViewportProvider>
  );
}
