import { HighlightLayer, Color3 } from "babylonjs";

export class MoveHint
{
    constructor(scene, caze) {
        this.case = caze;
        this.scene = scene;
        this.highlightLayer = new HighlightLayer("", scene);
        this.meshes = [];
        this.color = new Color3(.2, .3, .7);
    }

    on() {
        this.case.mesh.material.emissiveColor.b = 0.3;
        // if (this.case.dernierEtage()) {
        //     this.meshes.push(this.case.dernierEtage().mesh);
        // } else {
        //     this.meshes.push(this.case.mesh);
        // }
        // this.addAll();
    }

    off() {
        this.case.mesh.material.emissiveColor.b = 0;
        // this.meshes.forEach(mesh => {
        //     this.highlightLayer.removeMesh(mesh);
        // });

        // this.meshes = [];
    }

    addAll() {
        this.meshes.forEach(mesh => {
            this.highlightLayer.addMesh(mesh, this.color);
        });
    }
}