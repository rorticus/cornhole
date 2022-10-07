import {SystemContext} from "../../engine/states";
import {Components} from "../components";
import {GameTime, Resources} from "../resources";

export function timeSystem(
    context: SystemContext<Components, Resources>
) {
    context.resources.set(GameTime, (context.resources.get(GameTime) || 0) + context.elapsedSeconds);
}
