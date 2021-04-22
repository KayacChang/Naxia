export function nextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function nextFrame() {
  const start = performance.now();

  return new Promise((resolve) =>
    requestAnimationFrame((end) => resolve(end - start))
  );
}

export * from "./undoable";
export * from "./RenderProps";
export * from "./useViewport";
