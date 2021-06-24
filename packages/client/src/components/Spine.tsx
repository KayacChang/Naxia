import { applyDefaultProps, Container, PixiComponent } from "@inlet/react-pixi";
import { SkeletonData, Spine } from "@pixi-spine/runtime-3.8";
import { ComponentProps } from "react";

type SpineProps = ComponentProps<typeof Container> & {
  data: SkeletonData;
  mount?: (spine: Spine) => void;
};

export default PixiComponent<SpineProps, Spine>("Spine", {
  config: {
    destroy: false,
    destroyChildren: false,
  },
  create: ({ data }) => new Spine(data),
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps);

    const { mount } = newProps;
    mount?.(instance);
  },
  willUnmount: (instance, parent) => {
    instance.state.clearTracks();
    instance.state.clearListeners();
  },
});
