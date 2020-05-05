export class Win extends Error {
    constructor(joueur) {
        super();
        this.joueur = joueur;
    }
}