import { EmitterInterface, Emitter, EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { ExecuteCodeAction, ActionManager, Scene, AbstractMesh } from "babylonjs";
import { Container } from "../Container";
import { Case } from "./Case";

export abstract class Construction implements EmitterInterface
{
    public readonly prochainNiveau: number;
    private mesh: AbstractMesh;
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
    }

    get minimumY (): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    abstract estUnDome: boolean;

    differenceDeNiveauAvec (construction: Construction): number {
        return construction.niveau - this.niveau;
    }

    dispose () {
        this.mesh.dispose();
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