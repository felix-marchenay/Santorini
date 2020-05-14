import { Deplacement } from "./steps/Deplacement";
import { NoDivinite } from "./divinite/NoDivinite";
import { Pion } from "./object/pion";
import { Vector3 } from "babylonjs";
import { DistantConstruction } from "./steps/distant/DistantConstruction";
import { DistantDeplacement } from "./steps/distant/DistantDeplacement";
import { DistantPreparation } from "./steps/distant/DistantPreparation";

export class Joueur
{
    constructor (nb, name, divinite, scene, id, distant, pionsIds) {
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

        this.couleursHex = couleursHex[nb-1];
        this.name = name;
        this.pions = [];
        this.lastMovedPion = null;
        this.nb = nb;
        this.divinite = divinite;
        this.distant = distant;
        this.id = id;

        if (divinite === null) {
            this.divinite = new NoDivinite;
        }

        this.pions.push(
            new Pion(scene, materials[nb-1], 'h', pionsIds[0].id),
            new Pion(scene, materials[nb-1], 'f', pionsIds[1].id)
        );

        this.pions.forEach((pion, i) => {
            pion.mesh.position = new Vector3((-7 + (this.nb*2+i)*2.2), 0, 8.6);
            pion.initialPosition = pion.mesh.position.clone();
        });
    }

    getDeplacementStep (game) {
        if (this.distant) {
            return this.divinite.getDistantDeplacementStep(game, this);
        }

        return this.divinite.getDeplacementStep(game, this);
    }

    getConstructionStep (game) {
        if (this.distant) {
            return this.divinite.getDistantConstructionStep(game, this);
        }

        return this.divinite.getConstructionStep(game, this);
    }

    getPreparationStep (game) {
        if (this.distant) {
            return this.divinite.getDistantPreparationStep(game, this);
        }

        return this.divinite.getPreparationStep(game, this);
    }

    isVictorious() {
        return this.divinite.isVictorious(this.lastMovedPion);
    }

    hasPion(pion) {
        return this.pions.filter(p => p == pion).length > 0;
    }

    export () {
        return {
            name: this.name,
            divinite: this.divinite.name,
            id: this.id,
            pions: this.pions.map(p => p.export())
        }
    }
}