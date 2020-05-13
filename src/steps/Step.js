export class Step
{
    constructor (game, joueur) {
        this.game = game;
        this.joueur = joueur;
    }

    run (fn) {
        if (this.joueur) {
            this.game.ihm.showActivePlayer(this.joueur.id);
        }
        return new Promise(fn);
    }
}