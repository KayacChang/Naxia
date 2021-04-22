import { ReactNode, isValidElement, PropsWithChildren } from "react";

type Props<T> = Pick<PropsWithChildren<T>, Exclude<keyof T, "children">>;

function isFunction<T, R>(instance: any): instance is (props: T) => R {
  return typeof instance === "function";
}

export function RenderProps<T>({ children, ...props }: PropsWithChildren<T>) {
  return (
    <>
      {isValidElement(children)
        ? children
        : isFunction<Props<T>, ReactNode>(children)
        ? children(props)
        : undefined}
    </>
  );
}
