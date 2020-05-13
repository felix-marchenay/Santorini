import { Divinite } from "./Divinite";
import { AtlasConstruction } from "../steps/divinite/atlas/AtlasConstruction";

export class Atlas extends Divinite
{
    constructor() {
        super();
        this.name = 'Atlas';
        this.slug = 'atlas';
    }

    getConstructionStep(game, joueur) {
        return [new AtlasConstruction(game, joueur)];
    }
}