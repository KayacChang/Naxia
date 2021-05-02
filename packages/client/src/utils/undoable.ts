import { Reducer, useReducer } from "react";

interface Action {
  type: string;
}

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

// function back<T>(step: number, state: HistoryState<T>) {
//   if (step <= 0) return state;

//   const { past, present, future } = state;

//   return {
//     past: past.slice(0, past.length - step),
//     present: past[past.length - step],
//     future: [...past.slice(step), present, ...future],
//   };
// }

export function useUndoable<T, A extends Action>(
  reducer: Reducer<T, A>,
  initial: T
) {
  //
  function enhancer(state: HistoryState<T>, action: A) {
    const { past, present, future } = state;

    if (action.type === "undo") {
      return {
        past: state.past.slice(0, past.length - 1),
        present: state.past[past.length - 1],
        future: [present, ...future],
      };
    }

    if (action.type === "redo") {
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    }

    if (reducer(present, action) === present) {
      return state;
    }

    return {
      past: [...past, present],
      present: reducer(present, action),
      future: [],
    };
  }

  return useReducer(enhancer, {
    past: [],
    present: initial,
    future: [],
  });
}
