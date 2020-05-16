import { MeshBuilder, StandardMaterial, Color3, HighlightLayer } from "@babylonjs/core";
import { Emitter } from "../infrastructure/Emitter";
import { Etage } from "./etage/Etage";
import { Color4, ExecuteCodeAction, ActionManager } from "babylonjs";

export class BuildHint
{
    constructor(scene, caze) {
        this.emitter = new Emitter;
        this.scene = scene;
        this.case = caze;
        this.built = {};
    }

    show(niveau) {
        if (this.built[niveau] === undefined) {
            this.built[niveau] = this.createMesh(niveau);
        }

        this.built[niveau].setEnabled(true);
    }

    createMesh(niveau) {

        const map = {
            "1" : 'etage-1',
            "1-dome" : 'etage-dome',
            "2" : 'etage-2',
            "2-dome" : 'etage-dome',
            "3" : 'etage-3',
            "3-dome" : 'etage-dome',
            "dome" : 'etage-dome'
        };

        const mesh = this.scene.container.meshes.find(mesh => mesh.id === map[niveau]).clone();

        mesh.freezeWorldMatrix();
        mesh.convertToUnIndexedMesh();
        mesh.material = new StandardMaterial("", this.scene);
        mesh.material.alpha = .2;
        mesh.material.diffuseColor = new Color3(0.9, 0.25, 0.9);
        mesh.position = this.case.mesh.position.clone();
        mesh.setEnabled(false);
        mesh.actionManager = new ActionManager(this.scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickDownTrigger,
                () => {
                    this.emitter.emit('pointerPicked', this);
                }
            )
        );
        mesh.renderOutline = true;
        mesh.outlineColor = new Color3(.8, .2, .85);
        mesh.outlineWidth = .08;

        if (niveau == '2-dome') {
            mesh.position.y = 1;
        } else if (niveau == '3-dome') {
            mesh.position.y = 1.8;
        }

        return mesh;
    }

    hide() {
        Object.values(this.built).forEach(etage => etage.setEnabled(false));
    }
}