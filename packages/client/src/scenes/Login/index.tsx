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

      console.log("failed");
    },
    [dispatch, history, username, password]
  );

  return (
    <form className="mt-32 w-2/5 space-y-4 font-kai" onSubmit={onSubmit}>
      <InputField placeholder="輸入帳號" onChange={setUsername} />

      <InputField
        placeholder="輸入密碼"
        onChange={setPassword}
        type="password"
      />

      <Submit className="mx-14">{"登入"}</Submit>

      <div className="flex justify-between">
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
  const { width, height } = useViewport();

  return (
    <Game className="fixed top-0">
      <Spine
        data={getAssets("Login_Spine")}
        x={width / 2}
        y={height / 2}
        scale={1 / window.devicePixelRatio}
        mount={(spine) => spine.state.setAnimation(0, "animation", true)}
      />
    </Game>
  );
}

export default function Login() {
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(BGM.play(Sound.Login.BGM)), [dispatch]);

  return (
    <>
      <UI>
        <img src={Assets.Login.Login_Background} alt="background" />
      </UI>

      <View />

      <UI className="flex flex-col items-center justify-center text-white font-noto space-y-4">
        <Form />
      </UI>
    </>
  );
}
