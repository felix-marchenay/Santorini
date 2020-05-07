import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { Emitter } from "../../infrastructure/emitter";
import { Etage } from "./Etage";
import { Vector3 } from "babylonjs";

export class Dome extends Etage {
    constructor(scene, caseFrom) {
        super("dome", scene, caseFrom);

        const position = caseFrom.mesh.position.clone();
        this.mesh.position.set(position.x, caseFrom.YHighest() - 0.08, position.z);
        
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }

        this.animateBuild();
    }
}