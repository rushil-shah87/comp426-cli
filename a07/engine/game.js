/**
 * Author: Rushil Shah
 * COMP 426 Assignment 7
 */

let gameState = {
    board: [],
    score: 0,
    won: false,
    over: false
}

let Game = class {
    constructor(dim) {
        this.dim = dim;
        this.setupNewGame();
        this.listeners = [];
    }

    setupNewGame() {
        // create new array size dim^2
        gameState.board = new Array(this.dim ** 2)
        gameState.board.fill(0);
        // add 2 random tiles
        this.addTile();
        this.addTile();
    }

    loadGame(oldState) {
        gameState.board = oldState.board;
        gameState.score = oldState.score;
        gameState.won = oldState.won;
        gameState.over = oldState.over;
    }

    // MOVE LOGIC --------------------------------------------------------
    move(direction) {
        // console.log('shift ' + direction);
        let prev = gameState.board.slice(0);
        switch (direction) {
            case 'right':
                gameState.board = this.moveRight(gameState.board, true);
                break;
            case 'down':
                gameState.board = this.moveDown(gameState.board, true);
                break;
            case 'left':
                gameState.board = this.moveLeft(gameState.board, true);
                break;
            case 'up':
                gameState.board = this.moveUp(gameState.board, true);
                break;
        }
        // console.log(this.toString());
        if (this.checkValid(prev)) {
            this.updateListeners(Game.Event.MOVE);
            this.addTile();
            gameState.over = this.checkLose();
        }
        // console.log('score: ' + gameState.score);
    }

    moveRight(gameBoard, realMove) {
        gameBoard = flip(gameBoard, this.dim);
        gameBoard = this.shiftLeft(gameBoard, realMove);
        return flip(gameBoard, this.dim);
    }

    moveDown(gameBoard, realMove) {
        let prev = gameBoard.slice(0);
        gameBoard = transpose(gameBoard, this.dim);
        gameBoard = flip(gameBoard, this.dim);
        gameBoard = this.shiftLeft(gameBoard, realMove);
        gameBoard = flip(gameBoard, this.dim);
        return transpose(gameBoard, this.dim);
    }

    moveLeft(gameBoard, realMove) {
        return this.shiftLeft(gameBoard, realMove);
    }

    moveUp(gameBoard, realMove) {
        gameBoard = transpose(gameBoard, this.dim);
        gameBoard = this.shiftLeft(gameBoard, realMove);
        return transpose(gameBoard, this.dim);
    }

    shiftLeft(gameBoard, realMove) {
        for (let i = 0; i < this.dim; i++) {
            let row = [];
            let start = i * this.dim;
            let end = (i + 1) * this.dim;
            // take one row at a time
            row = gameBoard.slice(start, end);
            // cut out the 0s
            row = row.filter((e) => e !== 0);
            // if the row is not all 0s, add equivalent adjacent cells
            if (row.length != 0) {
                row.reduce((prev, curr, idx, arr) => {
                    if (prev === curr) {
                        arr[idx - 1] = curr * 2;
                        arr[idx] = 0;
                        if(realMove) {
                            gameState.score += curr * 2;
                            if (curr * 2 == 2048) {
                                // WIN CONDITION
                                gameState.won = true;
                                this.updateListeners(Game.Event.WIN);          
                            }   
                        }   
                    } 
                    return arr[idx];
                });
            } else continue;
        
            // cut out 0s again
            row = row.filter((e) => e !== 0);
            // set noninteger values to 0
            for (let g = 0; g < this.dim; g++) {
                if (!Number.isInteger(row[g])) row[g] = 0;
            }
            // update the game board
            let h = 0;
            for (let j = start; j < end; j++) {
                gameBoard[j] = row[h];
                h++;
            }
        }
        // console.log('gameBoard: ' + gameBoard);
        return gameBoard;
    }
    // END MOVE LOGIC -----------------------------------------------

    toString() {
        let boardString = '';
        for (let i = 0; i < this.dim ** 2; i++) {
            boardString += (gameState.board[i] + '\t');
            if (i % this.dim == this.dim - 1) boardString += '\n'
        }
        return boardString;
    }

    onMove(callback) {
        this.addListener((e)=> {
            if (e == Game.Event.MOVE) {
                callback(this.gameState);
            }
        });
    }

    onWin(callback) {
        gameState.won = true;
        this.addListener((e)=> {
            if (e == Game.Event.WIN) {
                callback(this.gameState);
            }
        });
    }

    onLose(callback) {
        // gameState.over = true;
        this.addListener((e)=> {
            if (e == Game.Event.LOSE) {
                callback(this.gameState);
            }
        });
    }

    getGameState() {
        return gameState;
    }

    addTile() {
        // console.log("add tile called");
        let idx = Math.floor(Math.random() * (this.dim ** 2));
        while (gameState.board[idx] != 0) {
            idx = Math.floor(Math.random() * (this.dim ** 2));
        }
        if (Math.random() > .9) {
            gameState.board[idx] = 4;
            // console.log("inserted 4 into: " + idx);
        } else {
            gameState.board[idx] = 2;
            // console.log("inserted 2 into: " + idx);
        }
    }

    checkValid(prev) {
        if (JSON.stringify(prev) == JSON.stringify(gameState.board)) {
            // console.log('laws violated. stop.');
            return false;
        } else {
            // console.log('successful move. congrats.');
            return true;
        }
    }

    checkLose() {
        let gameCopy = gameState.board.slice(0);
        if (gameCopy.some((i)=>i==0)) return false;
        if (JSON.stringify(this.moveRight(gameCopy, false)) == JSON.stringify(gameCopy) &&
            JSON.stringify(this.moveDown(gameCopy, false)) == JSON.stringify(gameCopy) &&
            JSON.stringify(this.moveLeft(gameCopy, false)) == JSON.stringify(gameCopy) &&
            JSON.stringify(this.moveUp(gameCopy, false)) == JSON.stringify(gameCopy)) {
            // console.log('game over');
            gameState.over = true;
            this.updateListeners(Game.Event.LOSE);
            return true;
        }
        // console.log('game not over');
        return false;
    }

    updateListeners(event) {
        this.listeners.forEach((l) => l(event));    
    }

    addListener(listener) {
        let idx = this.listeners.findIndex((l) => l == listener);
        if (idx == -1) {
            this.listeners.push(listener);
        }
    }

    removeListener(listener) {
        let idx = this.listeners.findIndex((l) => l == listener);
        if (idx != -1) {
            this.listeners.splice(idx, 1);
        }
    }
};

Game.Event = {
    MOVE: 0,
    WIN: 1,
    LOSE: 2
};

export function transpose(board, dim) {
    let transposed = new Array(dim ** 2);
    let idx = 0;
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            transposed[idx] = board[j * dim + i];
            idx++;
        }
    }
    return transposed;
}

export function flip(board, dim) {
    let flipped = new Array(dim ** 2);
    let idx = 0;
    for (let i = 0; i < dim; i++) {
        for (let j = dim - 1; j >= 0; j--) {
            flipped[idx] = board[i * dim + j];
            idx++;
        }
    }
    return flipped;
}

export default Game;