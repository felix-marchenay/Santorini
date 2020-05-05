import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { SceneLoader } from "babylonjs";
import { Emitter } from "../../infrastructure/emitter";
import { Etage } from "./Etage";

export class Etage2 extends Etage {
    constructor(scene, caseFrom) {
        super("2", scene, caseFrom);

        const positionCase = caseFrom.mesh.position.clone();
        this.mesh.position = positionCase;
        this.pionPosition = positionCase.clone();
        this.pionPosition.y = 2.1;
    }
}