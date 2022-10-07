import { SystemContext } from "../../engine/states";
import {
  AnimationFrame,
  Components,
  GraphicsImage,
  GraphicsImageAnimation,
} from "../components";
import { Resources } from "../resources";
import { MS_PER_UPDATE } from "../../engine/engine";

function createComponentForFrame(
  frame: AnimationFrame,
  image: CanvasImageSource
) {
  return {
    source: image,
    sourceX: frame.frame.x,
    sourceY: frame.frame.y,
    sourceWidth: frame.frame.w,
    sourceHeight: frame.frame.h,
    width: frame.frame.w,
    height: frame.frame.h,
  };
}

export function graphicsAnimatorSystem(
  context: SystemContext<Components, Resources>
) {
  context.entities.getEntities([GraphicsImageAnimation]).forEach((entity) => {
    let anim = entity.component(GraphicsImageAnimation)!;

    if (anim.currentFrame < 0) {
      // initialize at frame 0
      anim.t = 0;
      anim.currentFrame = 0;
      entity.addComponent(
        GraphicsImage,
        createComponentForFrame(anim.frames[0], anim.source)
      );
    } else {
      const frame = anim.frames[anim.currentFrame];
      let t = anim.t + MS_PER_UPDATE;

      if (t >= frame.duration) {
        // next frame
        t = t - frame.duration;

        if (anim.currentFrame === anim.frames.length - 1 && !anim.loop) {
          entity.delete();
        } else {
          anim.currentFrame = (anim.currentFrame + 1) % anim.frames.length;
          entity.addComponent(
            GraphicsImage,
            createComponentForFrame(anim.frames[anim.currentFrame], anim.source)
          );
        }
      }

      anim.t = t;
    }
  });
}
