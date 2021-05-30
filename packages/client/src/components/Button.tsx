import React, { ReactNode } from "react";
import clsx from "clsx";

type BaseButtonProps = {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  children?: ReactNode;
  onPointerUp?: (event: React.PointerEvent) => void;
  onPointerDown?: (event: React.PointerEvent) => void;
};
function BaseButton({ children, ...props }: BaseButtonProps) {
  return <button {...props}>{children}</button>;
}

type IconButtonProps = BaseButtonProps & {
  type: "img";
  img: string;
};
function IconButton({ img, children, ...props }: IconButtonProps) {
  return (
    <BaseButton {...props}>
      <img src={img} alt={img} />

      {children}
    </BaseButton>
  );
}

type DefaultButtonProps = BaseButtonProps & {
  type?: "default";
};
function DefaultButton({ className, children, ...props }: DefaultButtonProps) {
  return (
    <BaseButton className={clsx("px-4 py-2 rounded", className)} {...props}>
      {children}
    </BaseButton>
  );
}

type ButtonProps = IconButtonProps | DefaultButtonProps;
export function Button(props: ButtonProps) {
  if (props.type === "img") {
    return <IconButton {...props} />;
  }

  return <DefaultButton {...props} />;
}
