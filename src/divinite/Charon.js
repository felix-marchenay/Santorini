import { Divinite } from "./Divinite";
import { Deplacement } from "../steps/Deplacement";

export class Charon extends Divinite
{
    constructor() {
        super();
        this.name = 'Atlas';
        this.slug = 'atlas';
    }

    getDeplacementStep(game, joueur) {
        return [
            new CharonDebutTour(game, joueur),
            new Deplacement(game, joueur)
        ];
    }
}