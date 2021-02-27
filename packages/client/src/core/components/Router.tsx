import { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";

const isDev = process.env.NODE_ENV === "development";

type RouterProps = {
  children: ReactNode;
};
export function Router({ children }: RouterProps) {
  if (isDev) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}
