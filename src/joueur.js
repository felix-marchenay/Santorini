export class Joueur
{
    constructor (name, couleur) {
        this.name = name;
        this.pions = [];
        this.couleurPion = couleur;
        this.lastMovedPion = null;
    }
}