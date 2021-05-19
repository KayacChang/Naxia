import numeral from "numeral";

export const toTask = (assets: object) =>
  Object.entries(assets).map(([name, url]) => ({ name, url }));

export const currency = (value: number) => numeral(value).format("0,0");

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nextTick() {
  return wait(0);
}

export function nextFrame() {
  const start = performance.now();

  return new Promise((resolve) =>
    requestAnimationFrame((end) => resolve(end - start))
  );
}

export * from "./undoable";
export * from "./useViewport";
export * from "./useThunkReducer";
