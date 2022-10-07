import { SystemContext } from "../../engine/states";
import {
  Active,
  Arm,
  Bag,
  Components,
  GraphicsImage,
  Position,
  Velocity,
} from "../components";
import { Launch, Resources, ThrowingAngle, ThrowingPower } from "../resources";
import { bagImage } from "../assets";

const offsetX = 25;
const offsetY = 20;

export function launchSystem(context: SystemContext<Components, Resources>) {
  const params = context.resources.get(Launch);

  if (params) {
    const arm = context.entities.getEntities([Arm])[0];
    const power = context.resources.get(ThrowingPower) || 0;
    const angle = context.resources.get(ThrowingAngle) || 0;

    context.resources.set(Launch, null);

    if (arm) {
      const armPosition = arm.component(Position)!;

      const x = armPosition[0] + offsetX + Math.cos(angle) * 200;
      const y = armPosition[1] + offsetY - Math.sin(angle) * 200;

      context.entities.addEntity({
        [Position]: [x, y],
        [GraphicsImage]: bagImage,
        [Bag]: undefined,
        [Active]: undefined,
        [Velocity]: [
          Math.cos(angle) * 20 * power,
          -Math.sin(angle) * 20 * power,
        ],
      });
    }
  }
}
