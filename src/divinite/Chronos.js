import { Divinite } from "./Divinite";
import { Deplacement } from "../steps/Deplacement";
import { CharonDebutTour } from "../steps/divinite/charon/CharonDebutTour";
import { DistantDeplacement } from "../steps/distant/DistantDeplacement";

export class Chronos extends Divinite
{
    constructor() {
        super();
        this.name = 'Chronos';
        this.slug = 'chronos';
        this.description = "Vous l'emportez également si 5 tours sont complètes";
    }

    isVictoriousAfterBuild(game) {
        console.log(game.plateau.allCases().filter(c => c.estComplete()));
        return game.plateau.allCases().filter(c => c.estComplete()).length >= 5;
    }
}