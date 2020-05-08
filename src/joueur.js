import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";
import { Pion } from "./object/pion";
import { Vector3 } from "babylonjs";

export class Joueur
{
    constructor (nb, name, material, divinite, scene) {
        this.name = name;
        this.pions = [];
        this.lastMovedPion = null;
        this.nb = nb;
        this.divinite = divinite;

        if (divinite === null) {
            this.divinite = new NoDivinite;
        }

        this.pions.push(
            new Pion(scene, material, 'h'),
            new Pion(scene, material, 'f')
        );

        this.pions.forEach((pion, i) => {
            pion.mesh.position = new Vector3((-7 + (this.nb*2+i)*2.2), 0, 8.6);
            pion.initialPosition = pion.mesh.position.clone();
        });
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