import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";

export class Joueur
{
    constructor (name, couleur, divinite) {
        this.name = name;
        this.pions = [];
        this.couleurPion = couleur;
        this.lastMovedPion = null;
        if (divinite === null) {
            divinite = new NoDivinite;
        }
        this.divinite = divinite;
    }

    getDeplacementStep (game) {
        return this.divinite.getDeplacementStep(game, this);
    }

    getConstructionStep (game) {
        return this.divinite.getConstructionStep(game, this);
    }

    isVictorious() {
        return this.divinite.isVictorious(this.lastMovedPion);
    }
}