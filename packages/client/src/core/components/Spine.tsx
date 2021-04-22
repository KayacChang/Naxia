import { CustomPIXIComponent, DisplayObjectProps } from "react-pixi-fiber";

type SpineProps = DisplayObjectProps<PIXI.Container> & {
  data: PIXI.spine.core.SkeletonData;
};
const Spine = CustomPIXIComponent<PIXI.spine.Spine, SpineProps>(
  {
    customDisplayObject: ({ data }) => new PIXI.spine.Spine(data),
    customApplyProps(instance, _, newProps) {
      Object.assign(instance, newProps);
    },
    customDidAttach(instance) {
      const animations = instance.spineData.animations;

      instance.state.setAnimation(0, animations[0].name, true);
    },
    customWillDetach(instance) {
      instance.destroy();
    },
  },
  "Spine"
);

export { Spine };
