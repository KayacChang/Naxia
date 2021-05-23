export function getViewPort(ratio = 16 / 9) {
  return {
    width: window.innerHeight * ratio,
    height: window.innerHeight,
  };
}
