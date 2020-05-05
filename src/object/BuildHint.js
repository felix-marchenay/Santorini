import { MeshBuilder, StandardMaterial, Color3, HighlightLayer } from "@babylonjs/core";
import { Emitter } from "../infrastructure/emitter";
import { Etage } from "./etage/Etage";
import { Color4 } from "babylonjs";

export class BuildHint
{
    constructor(scene, caze) {
        this.emitter = new Emitter;
        
        this.case = caze;
        
        this.etages =  [
            {
                niveau : Etage.NIVEAU_1,
                mesh : scene.container.meshes.find(mesh => mesh.id === 'etage-1').clone(),
            },
            {
                niveau : Etage.NIVEAU_2,
                mesh : scene.container.meshes.find(mesh => mesh.id === 'etage-2').clone(),
            },
            {
                niveau : Etage.NIVEAU_3,
                mesh : scene.container.meshes.find(mesh => mesh.id === 'etage-3').clone(),
            },
            {
                niveau : Etage.NIVEAU_DOME,
                mesh : scene.container.meshes.find(mesh => mesh.id === 'etage-dome').clone(),
            },
        ];
        
        this.etages.forEach(etage => {
            etage.mesh.material = new StandardMaterial("", scene);
            etage.mesh.material.alpha = 0.15;
            etage.mesh.material.diffuseColor = new Color3(0.9, 0.25, 0.9);
            etage.mesh.position = this.case.mesh.position;
            etage.mesh.setEnabled(false);
            etage.mesh.pointerPicked = () => {
                this.emitter.emit('pointerPicked');
            }
            etage.mesh.renderOutline = true;
            etage.mesh.outlineColor = new Color3(.8, .2, .85);
            etage.mesh.outlineWidth = .025;
        });
    }

    show(niveaux) {
        this.etages
            .filter(etage => niveaux.includes(etage.niveau))
            .forEach(etage => etage.mesh.setEnabled(true));
    }

    hide(niveaux) {
        this.etages.forEach(etage => etage.mesh.setEnabled(false));
    }
}