import { Divinite } from "./Divinite";
import { PoseidonConstruction } from "../steps/divinite/poseidon/PoseidonConstruction";
import { PoseidonEndTurn } from "../steps/divinite/poseidon/PoseidonEndTurn";

export class Poseidon extends Divinite
{
    constructor() {
        super("poseidon");
    }

    getConstructionStep(game, joueur) {
        return [
            new PoseidonConstruction(game, joueur),
            new PoseidonEndTurn(game, joueur)
        ];
    }
}