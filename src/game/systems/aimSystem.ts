import { SystemContext } from "../../engine/states";
import { Components } from "../components";
import {
  GameTime,
  Resources,
  ThrowingAngle,
  ThrowingPower,
} from "../resources";

const angleVelocity = 0.05;

export function aimSystem(context: SystemContext<Components, Resources>) {
  const t = context.resources.get(GameTime) || 0;

  // change the power
  let angle = context.resources.get(ThrowingAngle) || 0;

  const power = Math.sin(t) * Math.sin(t);
  angle += angleVelocity;

  context.resources.set(ThrowingPower, power);
  context.resources.set(ThrowingAngle, angle);
}
