import clsx from "clsx";
import { ReactNode } from "react";

type CommonButtonProps = {
  className?: string;
};

type IconButtonProps = CommonButtonProps & {
  type: "img";
  img: string;
  onClick?: (event: React.MouseEvent) => void;
  children?: ReactNode;
};
function IconButton({ img, className, children, onClick }: IconButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      <img src={img} alt={img} />

      {children}
    </button>
  );
}

type DefaultButtonProps = CommonButtonProps & {
  type?: "default";
  onClick?: (event: React.MouseEvent) => void;
  children?: ReactNode;
};
function DefaultButton({ onClick, className, children }: DefaultButtonProps) {
  return (
    <button className={clsx("px-4 py-2 rounded", className)} onClick={onClick}>
      {children}
    </button>
  );
}

type ButtonProps = IconButtonProps | DefaultButtonProps;
export function Button(props: ButtonProps) {
  if (props.type === "img") {
    return <IconButton {...props} />;
  }

  return <DefaultButton {...props} />;
}
