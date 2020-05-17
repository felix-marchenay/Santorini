import { 
    MeshBuilder,
    StandardMaterial,
    Color3,
    ActionManager,
    Vector3,
    Animation,
    SceneLoader
} from "@babylonjs/core";
import { Emitter } from "../infrastructure/Emitter";
import { CircleEase, EasingFunction, HighlightLayer, ExecuteCodeAction } from "babylonjs";

export class Pion {
    constructor (scene, material, gender, id) {
        this.emitter = new Emitter;
        this.idle = false;
        this.animations = null;
        this.scene = scene;
        this.gender = gender;
        this.mesh = scene.container.meshes.find(mesh => mesh.id === 'pion-'+gender).clone();
        this.mesh.material = material.clone();
        this.initRotation = this.mesh.rotation;
        this.id = id;
        this.highlight = new HighlightLayer('', scene);
        
        this.scene.shadows.forEach(sh => sh.getShadowMap().renderList.push(this.mesh));
        this.mesh.receiveShadows = true;
        
        this.mesh.actionManager = new ActionManager(scene);
        this.mesh.animations = [];
        this.case = null;

        this.onPickAction = new ExecuteCodeAction(
            ActionManager.OnPickDownTrigger,
            () => {
                this.emitter.emit('picked', this);
            }
        );
        this.onHoverAction = new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => {
                this.glow();
            }
        );
        this.onUnhoverAction = new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => {
                this.lightGlow();
            }
        );
    }

    enableClickable() {
        this.mesh.actionManager.registerAction(this.onHoverAction);
        this.mesh.actionManager.registerAction(this.onUnhoverAction);
        this.mesh.actionManager.registerAction(this.onPickAction);
        this.lightGlow();
    }

    disableClickable() {
        this.mesh.actionManager.unregisterAction(this.onHoverAction);
        this.mesh.actionManager.unregisterAction(this.onUnhoverAction);
        this.mesh.actionManager.unregisterAction(this.onPickAction);
        this.unGlow();
    }

    lightGlow() {
        this.mesh.material.emissiveColor.b = 0.15;
    }

    glow () {
        this.mesh.material.emissiveColor.b = 0.5;
    }

    unGlow() {
        this.mesh.material.emissiveColor.b = 0;
    }

    moveTo (caseCible) {
        if (this.case && this.case !== caseCible) {
            this.case.liberer();
        }

        this.mesh.animations.push(
            this.animationTo(caseCible.positionPosePion())
        );
        this.scene.beginAnimation(this.mesh, 0, 30, false);
        this.mesh.animations = [];

        this.case = caseCible;
        this.emitter.emit('moved', this);
    }

    initPosition() {
        this.mesh.animations.push(
            this.animationTo(this.initialPosition)
        );
        this.scene.beginAnimation(this.mesh, 0, 30, false);
        this.mesh.animations = [];
    }

    animationTo(vectorCase) {
        const animation = new Animation('anim', "position", 60, Animation.ANIMATIONTYPE_VECTOR3);
        
        const vectorMid = Vector3.Center(vectorCase, this.mesh.position);
        vectorMid.y += 1.1;

        animation.setKeys([
            {
                frame: 0,
                value: this.mesh.position
            },
            {
                frame: 18,
                value: vectorMid
            },
            {
                frame: 30,
                value: vectorCase
            }
        ]);

        return animation;
    }

    animateVictory() {
        const frames = 80;
        const animation = new Animation('anim', "rotation", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);

        const initPos = this.mesh.position.clone();
        initPos.y += 1;
        const endPos = initPos.clone();
        endPos.y += 2;

        animation.setKeys([
            {
                frame: 0,
                value: new Vector3(-Math.PI/2, -Math.PI/2, 0)
            },
            {
                frame: frames,
                value: new Vector3(-Math.PI/2, 3*Math.PI/2, 0)
            },
        ]);

        const animationTranslate = new Animation('anim', "position", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        animationTranslate.setKeys([
            {
                frame: 0,
                value: initPos
            },
            {
                frame: frames/3,
                value: endPos
            },
            {
                frame: frames,
                value: initPos
            },
        ]);

        this.mesh.animations.push(animation, animationTranslate);
        this.animations = this.scene.beginAnimation(this.mesh, 0, frames, true);
    }

    canGo(caze) {
        return caze.pion == null && (caze.differenceNiveau(this.case) < 2) && !caze.hasDome();
    }

    minotaurCanGo(caze) {
        return (caze.differenceNiveau(this.case) < 2) && !caze.hasDome();
    }

    toggleIdle() {
        if (this.idle) {
            this.stopIdle();
        } else {
            this.startIdle();
        }
    }

    startIdle() {
        this.idle = true;
        this.animateIdle();
    }

    stopIdle() {
        this.idle = false;
        if (this.animations) {
            this.animations.stop();
        }
        this.mesh.animations = [];
        this.mesh.rotation = this.initRotation;
    }

    animateIdle() {
        const frames = 80;
        const animation = new Animation('anim', "rotation", 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        animation.setKeys([
            {
                frame: 0,
                value: new Vector3(-Math.PI/2, -Math.PI/2, 0)
            },
            {
                frame: frames,
                value: new Vector3(-Math.PI/2, 3*Math.PI/2, 0)
            },
        ]);
        this.mesh.animations.push(animation);
        this.animations = this.scene.beginAnimation(this.mesh, 0, frames, true);
    }

    resetPosition() {
        if (!this.initialPosition) {
            console.error("No initial position");
            return;
        }

        this.mesh.position = this.initialPosition.clone();
    }

    pick() {
        this.mesh.material.diffuseColor = new Color3(0.6, 0.2, 0.9);
    }

    unpick() {
        this.mesh.material.diffuseColor = this.baseColor;
    }

    export () {
        return {
            id: this.id,
            position: {
                x: this.case ? this.case.coordinates.x : null,
                y: this.case ? this.case.coordinates.y : null,
            }
        };
    }
}