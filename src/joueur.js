import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";

export class Joueur
{
    constructor (name, couleur, divinite) {
        this.name = name;
        this.pions = [];
        this.couleurPion = couleur;
        this.lastMovedPion = null;
        this.divinite = new NoDivinite;
    }

    getDeplacementStep (game) {
        return this.divinite.getDeplacementStep(game, this);
    }

    getConstructionStep (game) {
        return this.divinite.getConstructionStep(game, this);
    }
}