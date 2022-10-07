import { ResourceManager } from "./resources";
import { EntityManager } from "./entities";
import { SoundManager } from "./sound";

export type System<E, R> = (context: SystemContext<E, R>) => void;
export type State = string | Symbol;

export interface SystemContext<E, R> {
  resources: ResourceManager<R>;
  entities: EntityManager<E>;
  changeState: (nextState: State) => void;
  sound: SoundManager;
  elapsedSeconds: number;
}

export type SystemContextWithoutState<E, R> = Omit<
  SystemContext<E, R>,
  "changeState"
>;

export interface SystemOptions<E, R> {
  initialize?: (context: SystemContextWithoutState<E, R>) => void;
}

export class StateMachine<E, R> {
  currentState: State | undefined;
  systems: Map<State, System<E, R>[]>;
  systemOptions: Map<State, SystemOptions<E, R>>;

  constructor() {
    this.currentState = undefined;
    this.systems = new Map();
    this.systemOptions = new Map();
  }

  addState(
    state: State,
    systems: System<E, R>[],
    options: SystemOptions<E, R> = {}
  ) {
    this.systems.set(state, systems);
    this.systemOptions.set(state, options);
  }

  transitionState(nextState: State, context: SystemContextWithoutState<E, R>) {
    this.currentState = nextState;

    const options = this.systemOptions.get(nextState);
    options?.initialize?.(context);
  }

  getCurrentSystems(): System<E, R>[] {
    return this.currentState ? this.systems.get(this.currentState) || [] : [];
  }
}
