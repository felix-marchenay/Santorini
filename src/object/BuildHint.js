import { MeshBuilder, StandardMaterial, Color3, HighlightLayer } from "@babylonjs/core";
import { Emitter } from "../infrastructure/emitter";
import { Etage } from "./etage/Etage";
import { Color4 } from "babylonjs";

export class BuildHint
{
    constructor(scene, caze) {
        this.emitter = new Emitter;
        
        this.case = caze;
        
        this.etages =  {
            "1" : scene.container.meshes.find(mesh => mesh.id === 'etage-1').clone(),
            "1-dome" : scene.container.meshes.find(mesh => mesh.id === 'etage-dome').clone(),
            "2" : scene.container.meshes.find(mesh => mesh.id === 'etage-2').clone(),
            "2-dome" : scene.container.meshes.find(mesh => mesh.id === 'etage-dome').clone(),
            "3" : scene.container.meshes.find(mesh => mesh.id === 'etage-3').clone(),
            "3-dome" : scene.container.meshes.find(mesh => mesh.id === 'etage-dome').clone(),
            "dome" : scene.container.meshes.find(mesh => mesh.id === 'etage-dome').clone(),
        };
        
        Object.values(this.etages).forEach(etage => {
            etage.material = new StandardMaterial("", scene);
            etage.material.alpha = .2;
            etage.material.diffuseColor = new Color3(0.9, 0.25, 0.9);
            etage.position = this.case.mesh.position.clone();
            etage.setEnabled(false);
            etage.pointerPicked = () => {
                this.emitter.emit('pointerPicked');
            }
            etage.renderOutline = true;
            etage.outlineColor = new Color3(.8, .2, .85);
            etage.outlineWidth = .08;
        });

        this.etages["2-dome"].position.y = 1;
        this.etages["3-dome"].position.y = 1.8;
    }

    show(...niveaux) {
        Object.keys(this.etages)
            .filter(key => niveaux.includes(key))
            .forEach(key => this.etages[key].setEnabled(true));
    }

    hide(niveaux) {
        Object.values(this.etages).forEach(etage => etage.setEnabled(false));
    }
}