import { EtageHint } from "./EtageHint";
import { Scene } from "babylonjs";
import { Case } from "./Case";
import { DomeHint } from "./DomeHint";
import { EmitterListener, Emitter } from "../Infrastructure/Emitter/Emitter";

export class BuildHint
{
    private etage: DomeHint | EtageHint | null = null;
    private emitter = new Emitter;

    constructor (
        private scene: Scene,
        private caze: Case
    ) {}

    show (niveau: number) {

        if (niveau === 4) {
            this.etage = new DomeHint(this.scene, niveau, this.caze);
        } else {
            this.etage = new EtageHint(this.scene, niveau, this.caze)
        }

        this.etage.on('click', () => this.emit('click'));
        this.etage.on('hover', () => this.emit('hover'));
        this.etage.on('unhover', () => this.emit('unhover'));
    }

    showDome (niveau: number) {
        this.etage = new DomeHint(this.scene, niveau, this.caze);

        this.etage.on('click', () => this.emit('click'));
        this.etage.on('hover', () => this.emit('hover'));
        this.etage.on('unhover', () => this.emit('unhover'));
    }

    hide () {
        this.etage?.flush();
        this.etage?.dispose();
        this.etage = null;
    }
    
    on (event: string, f: EmitterListener): EventListener {
        return this.emitter.on(event, f);
    }

    emit (event: string, ...vars: any[]) {
        this.emitter.emit(event, ...vars);
    }

    flush (): void {
        this.emitter.flush();
    }
}