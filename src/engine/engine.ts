import { EntityManager } from "./entities";
import { ResourceManager } from "./resources";
import { State, StateMachine } from "./states";
import { SoundManager } from "./sound";

export const MS_PER_UPDATE = 16;

export class Engine<E, R> {
  entities: EntityManager<E>;
  resources: ResourceManager<R>;
  stateMachine: StateMachine<E, R>;
  sound: SoundManager;

  constructor() {
    this.entities = new EntityManager<E>();
    this.resources = new ResourceManager<R>();
    this.stateMachine = new StateMachine();
    this.sound = new SoundManager();
  }

  start() {
    this.tick();
  }

  tick() {
    let previous = Date.now();
    let lag = 0;

    const frame = () => {
      const current = Date.now();
      const elapsed = current - previous;

      previous = current;
      lag += elapsed;

      while (lag >= MS_PER_UPDATE) {
        this.update();
        lag -= MS_PER_UPDATE;
      }

      // todo: render?
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  private getBaseContext() {
    const t = MS_PER_UPDATE / 1000;

    return {
      resources: this.resources,
      entities: this.entities,
      sound: this.sound,
      elapsedSeconds: t
    };
  }

  update() {
    const baseContext = this.getBaseContext();

    const context = {
      ...baseContext,
      changeState: (state: State) => this.changeState(state),
    };
    const systems = this.stateMachine.getCurrentSystems();

    systems.forEach((system) => {
      system(context);
    });
  }

  changeState(state: State) {
    this.stateMachine.transitionState(state, this.getBaseContext());
  }
}
