import Engine from "../engine";
import {
  Arm,
  Components,
  GraphicsImage,
  Position,
  ScoreZone,
  Size,
} from "./components";
import {
  DrawingContext,
  Launch,
  Resources,
  Score,
  ThrowingAngle,
  ThrowingPower,
} from "./resources";
import { Intro, Playing } from "./states";
import { drawImagesSystem } from "./systems/drawImages";
import { graphicsAnimatorSystem } from "./systems/graphicsAnimator";
import { aimSystem } from "./systems/aimSystem";
import { timeSystem } from "./systems/timeSystem";
import { launchSystem } from "./systems/launchSystem";
import { backgroundImage, cornholeImage, manImage, titleImage } from "./assets";
import { drawUISystem } from "./systems/drawUi";
import { moveSystem } from "./systems/moveSystem";
import { bagScoreSystem } from "./systems/bagScoreSystem";
import { lifetimeSystem } from "./systems/LifetimeSystem";

export class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  engine: Engine<Components, Resources>;
  keyDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.engine = new Engine<Components, Resources>();
    this.keyDown = false;

    this.setup();

    window.addEventListener("keydown", (e) => {
      this.keyDown = true;

      if (e.key === " ") {
        this.engine.resources.set(Launch, {
          angle: this.engine.resources.get(ThrowingAngle) || 0,
          power: this.engine.resources.get(ThrowingPower) || 0,
        });
      }
    });

    window.addEventListener("keyup", () => {
      this.keyDown = false;
    });
  }

  setup() {
    this.engine.stateMachine.addState(
      Intro,
      [
        drawImagesSystem,
        (context) => {
          if (this.keyDown) {
            context.changeState(Playing);
          }
        },
      ],
      {
        initialize: (context) => {
          context.entities.reset();
          context.resources.reset();

          context.resources.set(DrawingContext, this.context);

          context.entities.addEntity({
            [Position]: [0, 0],
            [GraphicsImage]: titleImage,
          });
        },
      }
    );

    this.engine.stateMachine.addState(
      Playing,
      [
        timeSystem,
        graphicsAnimatorSystem,
        drawImagesSystem,
        aimSystem,
        drawUISystem,
        launchSystem,
        moveSystem,
        bagScoreSystem,
        lifetimeSystem,
      ],
      {
        initialize: (context) => {
          context.resources.reset();
          context.entities.reset();

          context.resources.set(DrawingContext, this.context);

          context.resources.set(Score, 0);
          context.resources.set(ThrowingAngle, 0);
          context.resources.set(ThrowingPower, 0);

          context.entities.addEntity({
            [Position]: [0, 0],
            [GraphicsImage]: backgroundImage,
          });

          context.entities.addEntity({
            [Position]: [20, 75],
            [GraphicsImage]: manImage,
          });

          context.entities.addEntity({
            [Position]: [50, 260],
            [Arm]: undefined,
          });

          context.entities.addEntity({
            [Position]: [750, 550],
            [GraphicsImage]: cornholeImage,
          });

          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [765, 620],
            [Size]: [20, 20],
          });

          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [785, 615],
            [Size]: [20, 25],
          });
          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [805, 610],
            [Size]: [40, 30],
          });
          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [845, 605],
            [Size]: [20, 35],
          });
          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [865, 600],
            [Size]: [20, 40],
          });

          context.entities.addEntity({
            [ScoreZone]: 3,
            [Position]: [885, 595],
            [Size]: [20, 45],
          });
          context.entities.addEntity({
            [ScoreZone]: 3,
            [Position]: [905, 590],
            [Size]: [20, 50],
          });
          context.entities.addEntity({
            [ScoreZone]: 3,
            [Position]: [925, 585],
            [Size]: [20, 55],
          });
          context.entities.addEntity({
            [ScoreZone]: 1,
            [Position]: [945, 580],
            [Size]: [20, 60],
          });
        },
      }
    );

    this.engine.changeState(Intro);
  }

  start() {
    this.engine.start();
  }
}
