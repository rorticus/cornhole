export const Position = Symbol();
export const GraphicsImage = Symbol();
export const GraphicsImageAnimation = Symbol();
export const Arm = Symbol();
export const Bag = Symbol();
export const Active = Symbol();
export const Velocity = Symbol();
export const ScoreZone = Symbol();
export const Size = Symbol();
export const Lifetime = Symbol();

export interface AnimationFrame {
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  sourceSize: {
    w: number;
    h: number;
  };
  duration: number;
}

export interface Components {
  [Position]: [number, number];
  [GraphicsImage]:
    | CanvasImageSource
    | {
        sourceX: number;
        sourceY: number;
        sourceWidth: number;
        sourceHeight: number;
        width: number;
        height: number;
        source: CanvasImageSource;
      };
  [GraphicsImageAnimation]: {
    frames: AnimationFrame[];
    currentFrame: number;
    t: number;
    source: CanvasImageSource;
    loop?: boolean;
  };
  [Arm]: void;
  [Bag]: void;
  [Active]: void;
  [Velocity]: [x: number, y: number];
  [ScoreZone]: number;
  [Size]: [w: number, h: number];
  [Lifetime]: number;
}
