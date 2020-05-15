import { Divinite } from "./Divinite";
import { TritonDeplacement } from "../steps/divinite/triton/TritonDeplacement";

export class Triton extends Divinite
{
    constructor() {
        super();
        this.name = 'Triton';
        this.slug = 'triton';
        this.description = "À chaque fois que votre ouvrier se déplace sur une case du périmètre, il peut se déplacer à nouveau";
    }

    getDeplacementStep(game, joueur) {
        return [new TritonDeplacement(game, joueur)];
    }
}