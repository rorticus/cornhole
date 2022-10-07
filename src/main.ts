import { Game } from "./game/game";

const canvas = document.querySelector("#game") as HTMLCanvasElement;

const game = new Game(canvas);
game.setup();
game.start();
