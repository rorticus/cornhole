import { SystemContext } from "../../engine/states";
import { Components, GraphicsImage, Position } from "../components";
import { DrawingContext, Resources } from "../resources";

export function drawImagesSystem(
  context: SystemContext<Components, Resources>
) {
  const entities = context.entities.getEntities([Position, GraphicsImage]);
  const ctx = context.resources.get(DrawingContext)!;

  entities.forEach((entity) => {
    const position = entity.component(Position)!;
    const image = entity.component(GraphicsImage)!;

    if ("source" in image) {
      // sprite sheet
      ctx.drawImage(
        image.source,
        image.sourceX,
        image.sourceY,
        image.sourceWidth,
        image.sourceHeight,
        position[0],
        position[1],
        image.width,
        image.height
      );
    } else {
      ctx.drawImage(image, position[0], position[1]);
    }
  });
}
