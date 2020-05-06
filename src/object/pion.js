import { 
    MeshBuilder,
    StandardMaterial,
    Color3,
    ActionManager,
    Vector3,
    Animation,
    SceneLoader
} from "@babylonjs/core";
import { Emitter } from "../infrastructure/emitter";
import { CircleEase, EasingFunction } from "babylonjs";

export class Pion {
    constructor (scene, material, gender) {
        this.emitter = new Emitter;
        this.idle = false;
        this.idleAnimation = null;
        this.scene = scene;
        this.gender = gender;
        this.mesh = scene.container.meshes.find(mesh => mesh.id === 'pion-'+gender).clone();
        this.mesh.material = material;
        this.initRotation = this.mesh.rotation;

        this.mesh.actionManager = new ActionManager(scene);
        this.mesh.animations = [];
        this.case = null;

        this.mesh.pointerPicked = () => {
            this.emitter.emit('picked', this);
        }
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

    canGo(caze) {
        return caze.pion == null && (caze.differenceNiveau(this.case) < 2) && !caze.hasDome();
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
        if (this.idleAnimation) {
            this.idleAnimation.stop();
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
        this.idleAnimation = this.scene.beginAnimation(this.mesh, 0, frames, true);
    }

    pick() {
        this.mesh.material.diffuseColor = new Color3(0.6, 0.2, 0.9);
    }

    unpick() {
        this.mesh.material.diffuseColor = this.baseColor;
    }

    static VectorXY(x, y) {
        return new Vector3(x, 1.1, y);
    }
}