import { Divinite } from "./Divinite";
import { PoseidonConstruction } from "../steps/divinite/poseidon/PoseidonConstruction";

export class Poseidon extends Divinite
{
    constructor() {
        super("poseidon");
    }

    getConstructionStep(game, joueur) {
        return new PoseidonConstruction(game, joueur);
    }
}