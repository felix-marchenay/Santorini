import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { SceneLoader, Vector3 } from "babylonjs";
import { Emitter } from "../../infrastructure/emitter";
import { Etage } from "./Etage";

export class Etage1 extends Etage {
    constructor(scene, caseFrom) {
        super("1", scene, caseFrom);

        const positionCase = caseFrom.mesh.position.clone();
        positionCase.y += 1.82;
        this.mesh.position = positionCase;
        this.mesh.scaling = new Vector3(1.65, 1.65, 1.65);
        this.pionPosition = positionCase.clone();
        this.pionPosition.y = 2.25;
    }
}