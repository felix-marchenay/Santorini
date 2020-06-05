import { ConstructionCollection } from "./ConstructionCollection";
import { EtageHint } from "./EtageHint";
import { Scene } from "babylonjs";
import { Case } from "./Case";
import { DomeHint } from "./DomeHint";

export class BuildHint
{
    private etages = new ConstructionCollection;

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
            this.etages.addHint(hint);
        }

        this.etages.enable(niveau);
    }

    hide () {
        this.etages.disableAll();
    }
}