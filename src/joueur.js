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

        console.log(scene);
        this.pions.push(
            new Pion(scene, material, 'h'),
            new Pion(scene, material, 'f')
        );

        this.pions.forEach(pion => {
            pion.mesh.position = new Vector3(-10, 1, (-5 + this.nb*2.2));
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