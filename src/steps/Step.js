export class Step
{
    constructor (game) {
        this.game = game;
    }

    run (fn) {
        return new Promise(fn);
    }
}