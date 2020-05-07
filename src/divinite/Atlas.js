import { Divinite } from "./Divinite";
import { AtlasConstruction } from "../steps/divinite/atlas/AtlasConstruction";

export class Atlas extends Divinite
{
    constructor() {
        super('Atlas');
    }

    getConstructionStep(game, joueur) {
        return new AtlasConstruction(game, joueur);
    }
}