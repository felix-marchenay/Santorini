import { Divinite } from "./Divinite";
import { PoseidonEndTurn } from "../steps/divinite/poseidon/PoseidonEndTurn";
import { Construction } from "../steps/Construction";

export class Poseidon extends Divinite
{
    constructor() {
        super("poseidon");
    }

    getConstructionStep(game, joueur) {
        return [
            new Construction(game, joueur),
            new PoseidonEndTurn(game, joueur)
        ];
    }
}