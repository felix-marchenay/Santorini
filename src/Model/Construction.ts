import { EmitterInterface, Emitter, EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { ExecuteCodeAction, ActionManager, Scene, AbstractMesh, Animation } from "babylonjs";
import { Container } from "../Container";
import { Case } from "./Case";

export abstract class Construction implements EmitterInterface
{
    public readonly prochainNiveau: number;
    protected mesh: AbstractMesh;
    private emitter = new Emitter;
    private actions: {hover: ExecuteCodeAction, unhover: ExecuteCodeAction, click: ExecuteCodeAction};

    constructor (
        private scene: Scene,
        meshName: string,
        public readonly niveau: number,
        caze: Case,
    ) {
        this.mesh = Container.loadMesh(meshName);
        this.mesh.actionManager = new ActionManager(this.scene);
        this.mesh.position = caze.position;
        this.prochainNiveau = this.niveau+1;

        this.actions = {
            hover: new ExecuteCodeAction(
                ActionManager.OnPointerOverTrigger,
                () => {
                    this.emit('hover', this);
                }
            ),
            unhover: new ExecuteCodeAction(
                ActionManager.OnPointerOutTrigger,
                () => {
                    this.emit('unhover', this);
                }
            ),
            click: new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => {
                    this.emit('click', this);
                }
            ),
        };

        this.animateBuild();
    }

    get minimumY (): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    abstract estUnDome: boolean;

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

    differenceDeNiveauAvec (construction: Construction): number {
        return construction.niveau - this.niveau;
    }

    dispose () {
        this.mesh.dispose();
    }

    enable () {
        this.mesh.setEnabled(true);
    }

    disable () {
        this.mesh.setEnabled(false);
    }

    enableClickable() {
        if (this.mesh.actionManager) {
            this.mesh.actionManager.registerAction(this.actions.hover);
            this.mesh.actionManager.registerAction(this.actions.unhover);
            this.mesh.actionManager.registerAction(this.actions.click);
        }
    }

    disableClickable() {
        if (this.mesh.actionManager) {
            this.mesh.actionManager.unregisterAction(this.actions.hover);
            this.mesh.actionManager.unregisterAction(this.actions.unhover);
            this.mesh.actionManager.unregisterAction(this.actions.click);
        }
    }
    
    // Emitter
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