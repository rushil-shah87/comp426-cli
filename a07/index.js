import Game from './engine/game.js'
import GameView from './game-view.js'
import GameController from './game-controller.js'

let model = null;
let controller = null;
let view = null;

$(() => {
    model = new Game(4);
    view = new GameView(model);
    controller = new GameController(model, view);
});