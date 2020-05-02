import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { Emitter } from "../../infrastructure/emitter";
import { Etage } from "./Etage";

export class Dome extends Etage {
    constructor(scene, caseFrom) {
        super("dome", scene, caseFrom);
        
        this.mesh.material = new StandardMaterial("gris", this.scene);
        this.mesh.material.diffuseColor = new Color3(0.3, 0.3, 0.9);

        const position = caseFrom.mesh.position.clone();
        position.y = 4;
        this.mesh.position = position;
        
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
    }
}