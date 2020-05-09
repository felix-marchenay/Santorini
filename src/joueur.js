import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";
import { Pion } from "./object/pion";
import { Vector3 } from "babylonjs";
import { DistantConstruction } from "./steps/distant/DistantConstruction";
import { DistantDeplacement } from "./steps/distant/DistantDeplacement";

export class Joueur
{
    constructor (nb, name, material, divinite, scene, couleurHex, distant) {
        this.name = name;
        this.pions = [];
        this.lastMovedPion = null;
        this.nb = nb;
        this.divinite = divinite;
        this.couleurHex = couleurHex;
        this.distant = distant;

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
        if (this.distant) {
            return [new DistantDeplacement(game, this)];
        }

        return this.divinite.getDeplacementStep(game, this);
    }

    getConstructionStep (game) {
        if (this.distant) {
            return [new DistantConstruction(game, this)];
        }

        return this.divinite.getConstructionStep(game, this);
    }

    isVictorious() {
        return this.divinite.isVictorious(this.lastMovedPion);
    }
}