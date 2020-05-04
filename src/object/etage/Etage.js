import { Emitter } from "../../infrastructure/emitter";
import { StandardMaterial, Color3, Texture } from "babylonjs";

export class Etage
{
    constructor(niveau, scene, caseFrom) {
        this.niveau = niveau;
        this.scene = scene;
        this.case = caseFrom;
        this.emitter = new Emitter;
        
        this.mesh = scene.container.meshes.find(mesh => mesh.id === 'etage-'+niveau).clone();
        
        this.mesh.material = new StandardMaterial("gris", this.scene);
        this.mesh.material.diffuseTexture = new Texture("/image/concrete.jpg", this.scene);
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
        this.pionPosition = null;
    }

    difference (etage) {
        if (etage === null) {
            return parseInt(this.niveau);
        }
        
        return parseInt(this.niveau) - parseInt(etage.niveau);
    }

    nextLevel() {
        switch (this.niveau) {
            case Etage.NIVEAU_1:
                return Etage.NIVEAU_2;
            case Etage.NIVEAU_2:
                return Etage.NIVEAU_3;
            case Etage.NIVEAU_3:
                return Etage.NIVEAU_DOME;
            case Etage.NIVEAU_DOME:
                throw "Pas de niveau après le dôme";
        }
    }
}

Etage.NIVEAU_1 = "1";
Etage.NIVEAU_2 = "2";
Etage.NIVEAU_3 = "3";
Etage.NIVEAU_DOME = "dome";