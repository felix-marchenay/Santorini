import { Divinite } from "./Divinite";

export class NoDivinite extends Divinite
{
    constructor() {
        super();
    }

    getDeplacementStep (game, joueur) {
        return this.divinite.getDeplacementStep(game, this);
    }

    getConstructionStep (game, joueur) {
        return this.divinite.getConstructionStep(game, this);
    }
}