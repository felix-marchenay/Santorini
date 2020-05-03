import { Divinite } from "./Divinite";
import { Construction } from "../steps/Construction";
import { Deplacement } from "../steps/Deplacement";

export class NoDivinite extends Divinite
{
    constructor() {
        super();
    }

    getDeplacementStep (game, joueur) {
        return new Deplacement(game, joueur);
    }

    getConstructionStep (game, joueur) {
        return new Construction(game, joueur);
    }
}