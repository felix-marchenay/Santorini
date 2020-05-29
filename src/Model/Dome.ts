import { AbstractMesh, Scene, ActionManager } from "babylonjs";
import { Construction } from "./Construction";
import { Container } from "../Container";
import { EmitterListener, Emitter } from "../Infrastructure/Emitter/Emitter";

export class Dome implements Construction
{
    private mesh: AbstractMesh;
    private emitter = new Emitter;
    
    constructor (
        private scene: Scene
    ) {
        this.mesh = Container.loadMesh('etage-dome');
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau (): number {
        return 4;
    }

    get prochainNiveau(): number {
        throw "Pas de prochain niveau sur le dome";
    }

    get minimumY (): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    estUnDome(): boolean {
        return true;
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