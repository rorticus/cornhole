export const DrawingContext = Symbol();
export const CanvasSize = Symbol();
export const ThrowingAngle = Symbol();
export const ThrowingPower = Symbol();
export const GameTime = Symbol();
export const Launch = Symbol();
export const Score = Symbol();

export interface Resources {
  [DrawingContext]: CanvasRenderingContext2D;
  [CanvasSize]: [number, number];
  [ThrowingAngle]: number;
  [ThrowingPower]: number;
  [GameTime]: number;
  [Launch]: { angle: number; power: number } | null;
  [Score]: number;
}
