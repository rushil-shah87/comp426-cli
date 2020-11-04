let GameView = class {
    constructor(model) {
        this.model = model;
        this.listeners = [];
        this.tiles = [];
        this.score = document.getElementById("score");

        // generate board
        const board = document.querySelector('#board');
        for (let r = 0; r < this.model.dim; r++) {
            let row = document.createElement("div");
            row.className = "row";
            for (let c = 0; c < this.model.dim; c++) {
                let tile = document.createElement("div");
                tile.className = "col-3";
                tile.innerHTML = this.model.getGameState().board[r * 4 + c];
                this.tiles.push(tile);
                row.appendChild(tile);
            }
            board.appendChild(row);
        }

        // handle a keydown event
        let keydown_handler = (e) => {
            let down = e.keyCode;
            let action;
            switch (down) {
                case 37:
                    action = "left";
                    break;
                case 38:
                    action = "up";
                    break;
                case 39:
                    action = "right";
                    break;
                case 40:
                    action = "down";
                    break;
                case 82:
                    action = "reset";
                    break;
            }
            this.updateListeners(action);
        };

        window.addEventListener("keydown", keydown_handler);

        let reset_handler = ((e) => {
            e.preventDefault();
            let action = "reset";
            this.updateListeners(action);
        });
        $('#reset').on('click', reset_handler);

        this.model.addListener((e) => {
            if (e == 0) {
                this.endGame();
            } else if (e == 2) {
                this.winGame();
            }
        });

    }

    updateBoard() {
        for (let i = 0; i < this.model.dim ** 2; i++) {
            this.tiles[i].innerHTML = this.model.getGameState().board[i];
        }
        this.updateScore();
    }

    updateScore() {
        this.score.innerHTML = "Score: "+this.model.getGameState().score;
    }

    endGame() {
        let notif_div = document.querySelector('.notifications');
        let message = document.createElement("p");
        message.innerHTML = "You Lost! Reset game to start over";
        notif_div.appendChild(message);
    }

    winGame() {
        let notif_div = document.querySelector('.notifications');
        let message = document.createElement("p");
        message.innerHTML = "You Won! Keep playing to get a high score!";
        notif_div.appendChild(message);
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

    updateListeners(event) {
        this.listeners.forEach((l) => l(event));
    }
}

export default GameView;