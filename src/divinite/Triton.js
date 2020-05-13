import { Divinite } from "./Divinite";
import { TritonDeplacement } from "../steps/divinite/triton/TritonDeplacement";

export class Triton extends Divinite
{
    constructor() {
        super();
        this.name = 'Triton';
        this.slug = 'triton';
    }

    getDeplacementStep(game, joueur) {
        return [new TritonDeplacement(game, joueur)];
    }
}