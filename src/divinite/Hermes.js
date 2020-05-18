import { Divinite } from "./Divinite";
import { DemeterConstruction } from "../steps/divinite/demeter/DemeterConstruction";

export class Hermes extends Divinite
{
    constructor() {
        super();
        this.name = 'Hermes';
        this.slug = 'hermes';
        this.description = "Si vous ne montez ni ne descendez d'un étage, vous pouvez déplacer vos deux ouvriers à volonté";
    }

    getDeplacementStep (game, joueur) {
        return [new DemeterConstruction(game, joueur)];
    }
}