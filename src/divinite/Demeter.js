import { Divinite } from "./Divinite";
import { DemeterConstruction } from "../steps/divinite/demeter/DemeterConstruction";

export class Demeter extends Divinite
{
    constructor() {
        super();
        this.name = 'Demeter';
        this.slug = 'demeter';
        this.description = "Peut construire une deuxième fois, mais pas sur la même case";
    }

    getConstructionStep (game, joueur) {
        return [new DemeterConstruction(game, joueur)];
    }
}