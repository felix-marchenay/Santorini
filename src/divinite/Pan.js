import { Divinite } from "./Divinite";
import { PanDeplacement } from "../steps/divinite/pan/PanDeplacement";

export class Pan extends Divinite
{
    constructor() {
        super('Pan');
    }

    getDeplacementStep (game, joueur) {
        return [new PanDeplacement(game, joueur)];
    }
}