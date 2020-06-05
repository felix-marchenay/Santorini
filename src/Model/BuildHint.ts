import { ConstructionCollection } from "./ConstructionCollection";
import { EtageHint } from "./EtageHint";
import { Scene } from "babylonjs";
import { Case } from "./Case";
import { DomeHint } from "./DomeHint";
import { EmitterListener, Emitter } from "../Infrastructure/Emitter/Emitter";

export class BuildHint
{
    private etages = new ConstructionCollection;
    private emitter = new Emitter;
    private active = false;

    constructor (
        private scene: Scene,
        private caze: Case
    ) {}

    show (niveau: number) {
        if ( ! this.etages.has(niveau)) {
            let hint;
            if (niveau === 4) {
                hint = new DomeHint(this.scene, niveau, this.caze);
            } else {
                hint = new EtageHint(this.scene, niveau, this.caze)
            }
            hint.on('click', () => this.emit('click'));
            hint.on('hover', () => this.emit('hover'));
            hint.on('unhover', () => this.active && this.emit('unhover'));
            this.etages.addHint(hint);
        }

        this.active = true;
        this.etages.enable(niveau);
    }

    hide () {
        this.active = false;
        this.etages.disableAll();
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