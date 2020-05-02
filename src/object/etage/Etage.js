import { Emitter } from "../../infrastructure/emitter";
import { StandardMaterial, Color3 } from "babylonjs";

export class Etage
{
    constructor(niveau, scene, caseFrom) {
        this.niveau = niveau;
        this.scene = scene;
        this.case = caseFrom;
        this.emitter = new Emitter;
        
        this.mesh = scene.container.meshes.find(mesh => mesh.id === 'etage-'+niveau).clone();
        
        this.mesh.material = new StandardMaterial("gris", this.scene);
        this.mesh.material.diffuseColor = new Color3(0.8, 0.82, 0.9);
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
}