import { ComponentProps } from "react";
import { PixiComponent, Container, applyDefaultProps } from "@inlet/react-pixi";
import { SkeletonData, Spine as _Spine } from "@pixi-spine/all-3.8";

type SpineProps = ComponentProps<typeof Container> & {
  data: SkeletonData;
};
const Spine = PixiComponent<SpineProps, _Spine>("Spine", {
  create: ({ data }) => new _Spine(data),
  applyProps(instance, oldP, newP) {
    applyDefaultProps(instance, oldP, newP);
  },
  didMount(instance) {
    const animations = instance.spineData.animations;
    instance.state.setAnimation(0, animations[0].name, true);
  },
  willUnmount(instance) {
    instance.destroy();
  },
});

export { Spine };
