import { SystemContext } from "../../engine/states";
import { Components, Lifetime } from "../components";
import { Resources } from "../resources";

export function lifetimeSystem(context: SystemContext<Components, Resources>) {
  context.entities.getEntities([Lifetime]).forEach((e) => {
    let t = e.component(Lifetime)!;

    t -= context.elapsedSeconds;

    if (t <= 0) {
      e.delete();
    } else {
      e.addComponent(Lifetime, t);
    }
  });
}
