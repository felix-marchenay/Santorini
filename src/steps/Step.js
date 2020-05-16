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

    after() {
        if (this.game.server) {
            this.game.server.emitter.flush();
        }
        this.game.hideAllBuildHint();
        this.game.pionsUnpickables(this.game.pions);
        this.game.casesUnpickables();
        this.game.hideSkip();
        this.game.ihm.emitter.flush();
    }
}