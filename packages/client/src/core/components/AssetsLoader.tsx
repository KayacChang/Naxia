import { RenderProps } from "core/utils";
import { ReactNode, useEffect, useReducer } from "react";
import { getResources, hasLoaded, load, ResourceMap } from "./load";

type LoaderStatus = "rejected" | "resolved" | "pending" | "loading";
type LoaderAction =
  | { type: "start" }
  | { type: "progress"; payload: number }
  | { type: "success"; payload: ResourceMap }
  | { type: "failure"; payload: string };

type LoaderState = {
  status: LoaderStatus;
  resources: ResourceMap;
  progress: number;
  error?: string;
};

function reducer(state: LoaderState, action: LoaderAction): LoaderState {
  if (action.type === "start") {
    return {
      ...state,
      status: "loading",
    };
  }

  if (action.type === "progress") {
    return {
      ...state,
      progress: action.payload,
    };
  }

  if (action.type === "success") {
    return {
      ...state,
      status: "resolved",
      progress: 100,
      resources: action.payload,
    };
  }

  if (action.type === "failure") {
    return {
      ...state,
      status: "rejected",
      error: action.payload,
    };
  }

  throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
}

type AssetsLoaderProps = {
  tasks: string[];
  children: (state: LoaderState) => ReactNode | ReactNode;
};
export function AssetsLoader({ tasks, children }: AssetsLoaderProps) {
  const [state, dispatch] = useReducer(reducer, {
    status: "pending",
    resources: {},
    progress: 0,
  });

  useEffect(() => {
    const _tasks = tasks.filter((task) => !hasLoaded(task));

    if (_tasks.length <= 0) {
      dispatch({ type: "success", payload: getResources() });

      return;
    }

    load(_tasks)
      .on("error", (payload) => dispatch({ type: "failure", payload }))
      .on("progress", (payload) => dispatch({ type: "progress", payload }))
      .on("complete", (payload) => dispatch({ type: "success", payload }));

    dispatch({ type: "start" });
  }, [tasks]);

  return <RenderProps {...state}>{children}</RenderProps>;
}
