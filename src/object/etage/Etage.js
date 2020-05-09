import { Emitter } from "../../infrastructure/Emitter";
import { StandardMaterial, Color3, Texture, HighlightLayer, Animation, Vector3 } from "babylonjs";

export class Etage
{
    constructor(niveau, scene, caseFrom) {
        this.niveau = niveau;
        this.scene = scene;
        this.case = caseFrom;
        this.emitter = new Emitter;
        
        this.mesh = scene.container.meshes.find(mesh => mesh.id === 'etage-'+niveau).clone();
        this.scene.shadow.getShadowMap().renderList.push(this.mesh);
        this.mesh.receiveShadows = true;
        
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
    }

    difference (etage) {
        if (etage === null) {
            return parseInt(this.niveau);
        }
        
        return parseInt(this.niveau) - parseInt(etage.niveau);
    }

    nextLevel() {
        switch (this.niveau) {
            case Etage.NIVEAU_1:
                return Etage.NIVEAU_2;
            case Etage.NIVEAU_2:
                return Etage.NIVEAU_3;
            case Etage.NIVEAU_3:
                return Etage.NIVEAU_DOME;
            case Etage.NIVEAU_DOME:
                throw "Pas de niveau après le dôme";
        }
    }

    animateBuild() {
        const animationTranslate = new Animation('anim', "position", 60, Animation.ANIMATIONTYPE_VECTOR3);
        
        let vectorMid = this.mesh.position.clone();
        vectorMid.y += 0.15;

        let initPosition = this.mesh.position.clone();
        initPosition.y -= 0.2;

        animationTranslate.setKeys([
            {
                frame: 0,
                value: initPosition
            },
            {
                frame: 11,
                value: vectorMid
            },
            {
                frame: 20,
                value: this.mesh.position
            }
        ]);

        const animationScale = new Animation('anim', "scaling", 60, Animation.ANIMATIONTYPE_VECTOR3);

        let initScaling = this.mesh.scaling.clone();
        initScaling.x *= 0.6;
        initScaling.y *= 0.6;
        initScaling.z *= 0.6;

        let scaling1 = this.mesh.scaling.clone();
        scaling1.x *= 0.85;

        let scaling2 = this.mesh.scaling.clone();
        scaling2.y *= 1.1;
        animationScale.setKeys([
            {
                frame: 0,
                value: initScaling
            },
            {
                frame: 9,
                value: scaling1
            },
            {
                frame: 15,
                value: scaling2
            },
            {
                frame: 20,
                value: this.mesh.scaling
            }
        ]);

        this.mesh.animations.push(animationTranslate, animationScale);
        this.scene.beginAnimation(this.mesh, 0, 20, false, 1);

        this.mesh.animations = [];
    }
}

Etage.NIVEAU_1 = "1";
Etage.NIVEAU_2 = "2";
Etage.NIVEAU_3 = "3";
Etage.NIVEAU_1_DOME = "1-dome";
Etage.NIVEAU_2_DOME = "2-dome";
Etage.NIVEAU_3_DOME = "3-dome";
Etage.NIVEAU_DOME = "dome";