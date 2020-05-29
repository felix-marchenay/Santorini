import { Scene, AbstractMesh, ActionManager, Vector3, Animation, Material, ExecuteCodeAction } from "babylonjs";
import { Case } from "./Case";
import { Container } from "../Container";
import { EmitterInterface, Emitter, EmitterListener } from "../Infrastructure/Emitter/Emitter";

export class Pion implements EmitterInterface
{
    private mesh: AbstractMesh;
    private case: Case | null = null;
    private actions: {hover: ExecuteCodeAction, unhover: ExecuteCodeAction, click: ExecuteCodeAction};
    private emitter: EmitterInterface = new Emitter;
    public idling: boolean = false;

    constructor (
        private scene: Scene,
        gender: 'f' | 'h',
        private initialPosition: Vector3,
        material: Material
    ) {
        this.mesh = Container.loadMesh("pion-" + gender);
        this.mesh.material = material;
        this.mesh.actionManager = new ActionManager(this.scene);
        this.mesh.position = this.initialPosition;

        this.actions = {
            hover: new ExecuteCodeAction(
                ActionManager.OnPointerOverTrigger,
                () => {
                    this.glow();
                }
            ),
            unhover: new ExecuteCodeAction(
                ActionManager.OnPointerOutTrigger,
                () => {
                    this.lightGlow();
                }
            ),
            click: new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => {
                    this.emit('picked', this);
                }
            ),
        };
    }

    enableClickable() {
        if (this.mesh.actionManager) {
            this.mesh.actionManager.registerAction(this.actions.hover);
            this.mesh.actionManager.registerAction(this.actions.unhover);
            this.mesh.actionManager.registerAction(this.actions.click);
            this.lightGlow();
        }
    }

    disableClickable() {
        if (this.mesh.actionManager) {
            this.mesh.actionManager.unregisterAction(this.actions.hover);
            this.mesh.actionManager.unregisterAction(this.actions.unhover);
            this.mesh.actionManager.unregisterAction(this.actions.click);
            this.unGlow();
        }
    }

    lightGlow() {
        // const mat = <StandardMaterial> this.mesh.material;
        // mat.emissiveColor.b = 0.15;
    }

    glow () {
        // const mat = <StandardMaterial> this.mesh.material;
        // mat.emissiveColor.b = 0.5;
    }

    unGlow() {
        // const mat = <StandardMaterial> this.mesh.material;
        // mat.emissiveColor.b = 0;
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

    on (event: string, f: EmitterListener): EventListener {
        return this.emitter.on(event, f);
    }

    off (event: string, f: EmitterListener): void {
        return this.emitter.off(event, f);
    }

    emit (event: string, ...vars: any[]) {
        this.emitter.emit(event, ...vars);
    }

    flush (): void {
        this.emitter.flush();
    }
}