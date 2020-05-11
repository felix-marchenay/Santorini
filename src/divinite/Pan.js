import { Divinite } from "./Divinite";
import { PanDeplacement } from "../steps/divinite/pan/PanDeplacement";

export class Pan extends Divinite
{
    constructor() {
        super();
        this.name = 'Pan';
        this.slug = 'pan';
    }

    getDeplacementStep (game, joueur) {
        return [new PanDeplacement(game, joueur)];
    }
}