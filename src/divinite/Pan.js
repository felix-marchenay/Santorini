import { Divinite } from "./Divinite";
import { PanDeplacement } from "../steps/divinite/pan/PanDeplacement";

export class Pan extends Divinite
{
    constructor() {
        super();
        this.name = 'Pan';
        this.slug = 'pan';
        this.description = "Si votre ouvrier descend d'au moins 2 étages, vous gagnez la partie";
    }

    getDeplacementStep (game, joueur) {
        return [new PanDeplacement(game, joueur)];
    }
}