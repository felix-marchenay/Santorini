import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";
import { Pion } from "./object/pion";
import { Vector3 } from "babylonjs";
import { DistantConstruction } from "./steps/distant/DistantConstruction";
import { DistantDeplacement } from "./steps/distant/DistantDeplacement";

export class Joueur
{
    constructor (nb, name, divinite, scene, distant) {
        const couleursHex = [
            'e6e6e6',
            '1543e6',
            '11d934'
        ];
        const materials = [
            scene.container.materials.find(mat => mat.id == 'pion-blanc'),
            scene.container.materials.find(mat => mat.id == 'pion-bleu'),
            scene.container.materials.find(mat => mat.id == 'pion-vert'),
        ];

        this.couleursHex = couleursHex[nb];
        this.name = name;
        this.pions = [];
        this.lastMovedPion = null;
        this.nb = nb;
        this.divinite = divinite;
        this.distant = distant;

        if (divinite === null) {
            this.divinite = new NoDivinite;
        }

        this.pions.push(
            new Pion(scene, materials[nb], 'h'),
            new Pion(scene, materials[nb], 'f')
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