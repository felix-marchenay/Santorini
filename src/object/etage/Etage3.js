import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { Emitter } from "../../infrastructure/Emitter";
import { Etage } from "./Etage";

export class Etage3 extends Etage {
    constructor(scene, caseFrom) {
        super("3", scene, caseFrom);

        const positionCase = caseFrom.mesh.position.clone();
        this.mesh.position = positionCase;

        this.animateBuild();
    }
}