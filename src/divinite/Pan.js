import { Divinite } from "./Divinite";
import { Deplacement } from "../steps/divinite/pan/Deplacement";

export class Pan extends Divinite
{
    getDeplacementStep (game, joueur) {
        return new Deplacement(game, joueur);
    }
}