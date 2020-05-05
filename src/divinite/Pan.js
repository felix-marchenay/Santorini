import { Divinite } from "./Divinite";
import { PanDeplacement } from "../steps/divinite/pan/Deplacement";

export class Pan extends Divinite
{
    getDeplacementStep (game, joueur) {
        return new PanDeplacement(game, joueur);
    }
}