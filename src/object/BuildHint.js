import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { Emitter } from "../infrastructure/emitter";

export class BuildHint
{
    constructor(scene, caze) {
        this.emitter = new Emitter;
        
        this.case = caze;
        
        this.mesh = MeshBuilder.CreateBox("", {
            height: 1.5,
            width: 3.2,
            depth: 3.2
        }, scene);
        
        this.mesh.material = new StandardMaterial("gris", scene);
        this.mesh.material.alpha = 0.2;
        this.mesh.material.diffuseColor = new Color3(0.9, 0.25, 0.9);
        this.mesh.position = this.case.mesh.position.clone();
        this.mesh.position.y += 0.5;

        this.hide();

        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
    }

    show() {
        this.mesh.setEnabled(true);
    }

    hide() {
        this.mesh.setEnabled(false);
    }
}