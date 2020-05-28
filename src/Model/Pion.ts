import { Scene, AbstractMesh, ActionManager, Vector3, Animation, Material } from "babylonjs";
import { Case } from "./Case";
import { Container } from "../Container";

export class Pion
{
    private mesh: AbstractMesh;
    private case: Case | null = null;

    constructor (
        private scene: Scene,
        gender: string,
        private initialPosition: Vector3,
        material: Material
    ) {
        this.mesh = Container.loadMesh("pion-" + gender);
        this.mesh.material = material;
        this.mesh.actionManager = new ActionManager(this.scene);

        this.mesh.position = this.initialPosition;
    }

    déplacerSur (caseCible: Case) {
        if (this.case && this.case !== caseCible) {
            this.case.libérer();
        }

        this.mesh.animations.push(
            this.animationTo(caseCible.positionPosePion)
        );
        this.scene.beginAnimation(this.mesh, 0, 30, false);
        this.mesh.animations = [];

        this.case = caseCible;
    }

    // initPosition(): void {
    //     this.mesh.animations.push(
    //         this.animationTo(this.initialPosition)
    //     );
    //     this.scene.beginAnimation(this.mesh, 0, 30, false);
    //     this.mesh.animations = [];
    // }

    animationTo(vectorCase: Vector3) {
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

    animateVictory(): void {
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
        this.scene.beginAnimation(this.mesh, 0, frames, true);
    }

    peutAller (caze: Case): boolean {
        if (this.case === null) {
            return ! caze.estOccupée;
        }
        return ! caze.estOccupée && (caze.differenceDeNiveauAvec(this.case) < 2);
    }
}