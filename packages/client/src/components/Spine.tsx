import React, { Component }  from 'react';
import { Container } from "@inlet/react-pixi";
import { SkeletonData, Spine as _Spine } from "@pixi-spine/runtime-3.8";
import { ComponentProps, memo, useEffect, useRef } from "react";
import { Container as TContainer } from "pixi.js";

type SpineProps = ComponentProps<typeof Container> & {
  data?: SkeletonData;
  mount?: (spine: _Spine) => void;
  unmount?: (spine: _Spine) => void;
};
export const Spine = memo(({ data, mount, unmount, ...props }: SpineProps) => {
  const ref = useRef<TContainer>(null);

  useEffect(() => {
    const current = ref.current;

    if (!current) return;

    if (!data)
      return () => {
        current.removeChildren();
      };

    const spine = new _Spine(data);

    current.addChild(spine);
    mount?.(spine);

    return () => {
      unmount?.(spine);
      spine.state.clearTracks();
      current.removeChildren();
    };
  }, [data, mount, unmount]);

  return <Container ref={ref} {...props} />;
});
