import { Divinite } from "./Divinite";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";
import { Steppable } from "../../Infrastructure/Steppable";
import { DeplacementApollon } from "../../Steps/Deplacement/DeplacementApollon";

export class Apollon extends Divinite
{
    public readonly name = "Apollon";
    public readonly slug = "apollon";
    public readonly description = "Lors de son dépolacement, peut échanger de place avec un autre joueur";

    getDeplacementStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new DeplacementApollon(jeu, joueur);
    }
}