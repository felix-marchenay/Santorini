import { Divinite } from "./Divinite";
import { ZeusConstruction } from "../steps/divinite/zeus/ZeusContruction";

export class Zeus extends Divinite
{
    constructor() {
        super();
        this.name = 'Zeus';
        this.slug = 'zeus';
        this.description = "Peut construire sur la case où il se trouve, mais ne peut pas l'emporter comme ça.";
    }

    getConstructionStep(game, joueur) {
        return [new ZeusConstruction(game, joueur)];
    }
}