import { SystemContext } from "../../engine/states";
import {
  Active,
  Bag,
  Components,
  Lifetime,
  Position,
  ScoreZone,
  Size,
  Velocity,
} from "../components";
import { Resources, Score } from "../resources";

export function bagScoreSystem(context: SystemContext<Components, Resources>) {
  const scoreZones = context.entities
    .getEntities([ScoreZone, Position, Size])
    .map((e) => ({
      points: e.component(ScoreZone)!,
      pos: e.component(Position)!,
      size: e.component(Size)!,
    }));

  context.entities.getEntities([Bag, Active]).forEach((entity) => {
    const position = entity.component(Position)!;
    const c = [position[0] + 79 / 2, position[1] + 63];

    scoreZones.forEach((zone) => {
      if (
        c[0] >= zone.pos[0] &&
        c[0] <= zone.pos[0] + zone.size[0] &&
        c[1] >= zone.pos[1] &&
        c[1] <= zone.pos[1] + zone.size[1]
      ) {
        entity.removeComponent(Active);
        entity.removeComponent(Velocity);

        context.resources.set(
          Score,
          (context.resources.get(Score) || 0) + zone.points
        );

        if (zone.points == 3) {
          entity.delete();
        }
      }
    });

    // any bags past a certain y are finished
    if (c[1] > 675) {
      entity.removeComponent(Active);
      entity.removeComponent(Velocity);
      entity.addComponent(Lifetime, 10);

      if (c[0] < 0 || c[0] > 1024) {
        entity.delete();
      }
    }
  });
}
