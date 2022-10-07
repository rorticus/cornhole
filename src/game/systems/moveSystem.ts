import { SystemContext } from "../../engine/states";
import { Components, Position, Velocity } from "../components";
import { Resources } from "../resources";

const gravity = 0.15;

export function moveSystem(context: SystemContext<Components, Resources>) {
  context.entities.getEntities([Position, Velocity]).forEach((entity) => {
    const position = entity.component(Position)!;
    let vel = entity.component(Velocity)!;

    vel[1] = vel[1] + gravity;

    entity.addComponent(Position, [position[0] + vel[0], position[1] + vel[1]]);
  });
}
