import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { Emitter } from "../../infrastructure/emitter";
import { Etage } from "./Etage";

export class Dome extends Etage {
    constructor(scene, caseFrom) {
        super("dome", scene, caseFrom);

        const position = caseFrom.mesh.position.clone();
        this.mesh.position = position;
        
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
    }
}