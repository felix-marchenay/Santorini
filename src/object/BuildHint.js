import { MeshBuilder, StandardMaterial, Color3, HighlightLayer } from "@babylonjs/core";
import { Emitter } from "../infrastructure/emitter";
import { Etage } from "./etage/Etage";

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
            etage.mesh.material.alpha = 0.35;
            etage.mesh.material.diffuseColor = new Color3(0.9, 0.25, 0.9);
            etage.mesh.position = this.case.mesh.position;
            etage.mesh.setEnabled(false);
            etage.mesh.pointerPicked = () => {
                this.emitter.emit('pointerPicked');
            }
            etage.mesh.enableEdgesRendering();    
            etage.mesh.edgesWidth = 1.6;
            etage.mesh.edgesColor = new BABYLON.Color4(0.8, .2, .85, 0.05);
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