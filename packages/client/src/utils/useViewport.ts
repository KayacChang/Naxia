import { useEffect, useState } from "react";

function getViewPort(ratio = 16 / 9) {
  return {
    width: window.innerHeight * ratio,
    height: window.innerHeight,
  };
}

export function useViewport() {
  const [viewport, setViewport] = useState(getViewPort());

  useEffect(() => {
    let loop = true;

    const update = () => {
      const { width, height } = getViewPort();

      if (viewport.width !== width || viewport.height !== height) {
        setViewport({ width, height });
      }

      loop && requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => void (loop = false);
  }, [viewport]);

  return viewport;
}
