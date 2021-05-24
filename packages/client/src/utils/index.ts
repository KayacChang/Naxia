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

export function throttle(wait: number, callback: (...args: any[]) => void) {
  let last = 0;

  return function call(...args: any[]) {
    const now = performance.now();
    const delta = now - last;

    if (delta < wait) return;

    callback(...args);
    last = now;
  };
}

export function debounce(wait: number, callback: (...args: any[]) => void) {
  let timer: NodeJS.Timeout | undefined;

  return (...args: any[]) => {
    if (!timer) {
      callback(...args);
    }

    timer && clearTimeout(timer);
    timer = setTimeout(() => timer = undefined, wait);
  };
}
