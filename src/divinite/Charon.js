import { Divinite } from "./Divinite";
import { Deplacement } from "../steps/Deplacement";
import { CharonDebutTour } from "../steps/divinite/charon/CharonDebutTour";
import { DistantDeplacement } from "../steps/distant/DistantDeplacement";

export class Charon extends Divinite
{
    constructor() {
        super();
        this.name = 'Charon';
        this.slug = 'charon';
    }

    getDeplacementStep(game, joueur) {
        return [
            new CharonDebutTour(game, joueur),
            new Deplacement(game, joueur)
        ];
    }

    getDistantDeplacementStep(game, joueur) {
        return [
            new DistantDeplacement(game, joueur),
            new DistantDeplacement(game, joueur)
        ];
    }
}