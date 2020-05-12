import { Divinite } from "./Divinite";
import { PoseidonEndTurn } from "../steps/divinite/poseidon/PoseidonEndTurn";
import { Construction } from "../steps/Construction";
import { DistantConstruction } from "../steps/distant/DistantConstruction";

export class Poseidon extends Divinite
{
    constructor() {
        super();
        this.name = 'Poséidon';
        this.slug = 'poseidon';
    }

    getConstructionStep(game, joueur) {
        return [
            new Construction(game, joueur),
            new PoseidonEndTurn(game, joueur)
        ];
    }

    getDistantConstructionStep(game, joueur) {
        return [
            new DistantConstruction(game, joueur),
            new DistantConstruction(game, joueur)
        ];
    }
}