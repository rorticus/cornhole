export const Intro = Symbol();
export const Playing = Symbol();
export const GameOver = Symbol();

export type States = typeof Intro | typeof Playing | typeof GameOver;
