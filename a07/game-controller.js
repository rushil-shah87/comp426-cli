let GameController = class {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addListener((s) => {
            if (s == "up" || s == "right" || s == "down" || s == "left") {
                this.model.move(s);
                this.view.updateBoard();
                this.view.updateScore();
            } else if (s == "reset") {
                this.model.setupNewGame();
                this.view.updateBoard();
                this.view.updateScore();
            }
        })

    }
}
export default GameController;