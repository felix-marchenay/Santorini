import { Divinite } from "./Divinite";
import { ZeusConstruction } from "../steps/divinite/zeus/ZeusContruction";

export class Zeus extends Divinite
{
    constructor() {
        super();
        this.name = 'Zeus';
        this.slug = 'zeus';
    }

    getConstructionStep(game, joueur) {
        return [new ZeusConstruction(game, joueur)];
    }
}