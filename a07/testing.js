import Game from "./engine/game";

let game = new Game(4);

game.loadGame({
    board: [ 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    score: 0,
    won: false,
    over: false
});

console.log('starting board');
console.log(game.toString());

console.log('move up');
game.move('up');

console.log(game.toString());

console.log(game.checkLose());

// console.log(game.moveLeft(game.getGameState().board,false));