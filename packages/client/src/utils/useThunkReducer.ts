import { useCallback, useReducer } from "react";

type ReducerParams = Parameters<typeof useReducer>;

export function useThunkReducer(
  reducer: ReducerParams[0],
  initializerArg: ReducerParams[1],
) {
  const [state, _dispatch] = useReducer(reducer, initializerArg);

  const enhancedDispatch = useCallback(
    (action) => {
      if (typeof action === "function") {
        return action(_dispatch);
      }

      return _dispatch(action);
    },
    [_dispatch],
  );

  return [state, enhancedDispatch];
}
