import { Divinite } from "./Divinite";
import { AtlasConstruction } from "../steps/divinite/atlas/AtlasConstruction";

export class Atlas extends Divinite
{
    constructor() {
        super();
        this.name = 'Atlas';
        this.slug = 'atlas';
        this.description = 'Il peut construire un dôme à n\'importe quel étage';
    }

    getConstructionStep(game, joueur) {
        return [new AtlasConstruction(game, joueur)];
    }
}