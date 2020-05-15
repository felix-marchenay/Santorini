import { Divinite } from "./Divinite";
import { MinotaurDeplacement } from "../steps/divinite/minotaur/MinotaurDeplacement";

export class Minotaur extends Divinite
{
    constructor() {
        super();
        this.name = 'Minotaur';
        this.slug = 'minotaur';
        this.description = "Lors de son déplacement : peut expulser un ouvrier adverse sur la case suivante";
    }

    getDeplacementStep(game, joueur) {
        return [new MinotaurDeplacement(game, joueur)];
    }
}