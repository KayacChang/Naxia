import clsx from "clsx";
import { UI, Game } from "layers";
import { ReactNode, useEffect, useState, FormEvent, useCallback } from "react";
import {
  selectAssetsByName,
  useAppDispatch,
  useAppSelector,
  user,
} from "system";
import { useHistory } from "react-router";
import Assets from "assets";
import { Spine } from "components";
import { useApp } from "@inlet/react-pixi";

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

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

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

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!username || !password) return;

      dispatch(user.auth({ username, password })).then(() =>
        history.push("/lobby")
      );
    },
    [dispatch, history, username, password]
  );

  return (
    <form className="mt-32 w-2/5 space-y-4" onSubmit={onSubmit}>
      <InputField placeholder="輸入帳號" onChange={setUsername} />

      <InputField
        placeholder="輸入密碼"
        onChange={setPassword}
        type="password"
      />

      <Submit className="mx-14">{"登入"}</Submit>

      <div className="flex justify-between text-shadow">
        <a href="/">{"還沒有帳號?"}</a>

        <a href="/">{"申請帳號"}</a>
      </div>
    </form>
  );
}

function View() {
  const assets = useAppSelector(selectAssetsByName);
  const app = useApp();
  const { width, height } = app.screen;

  return (
    <Spine
      data={assets("Login_Spine")}
      x={width / 2}
      y={height / 2}
      scale={0.4}
      mount={(spine) => spine.state.setAnimation(0, "animation", true)}
    />
  );
}

export default function Login() {
  return (
    <>
      <UI>
        <img src={Assets.Login.Login_Background} alt="background" />
      </UI>

      <Game className="fixed top-0">
        <View />
      </Game>

      <UI className="absolute top-0 flex flex-col items-center justify-center text-white font-noto space-y-4">
        <Form />
      </UI>
    </>
  );
}
