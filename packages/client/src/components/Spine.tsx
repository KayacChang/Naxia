import { ComponentProps } from "react";
import { PixiComponent, Container, applyDefaultProps } from "@inlet/react-pixi";
import { SkeletonData, Spine as _Spine } from "@pixi-spine/all-3.8";

class CustomSpine extends _Spine {
  destroy(options?: any): void {}
}

type SpineProps = ComponentProps<typeof Container> & {
  data: SkeletonData;
};

export const Spine = PixiComponent<SpineProps, _Spine>("Spine", {
  create: ({ data }) => {
    return new CustomSpine(data);
  },
  applyProps(instance, oldP, newP) {
    if (instance.state.getCurrent(0)) return;

    applyDefaultProps(instance, oldP, newP);
    const animations = instance.spineData.animations;
    instance.state.setAnimation(0, animations[0].name, true);
  },
});
