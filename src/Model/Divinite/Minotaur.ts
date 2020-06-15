import { Divinite } from "./Divinite";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";
import { Steppable } from "../../Infrastructure/Steppable";
import { DeplacementMinotaur } from "../../Steps/DeplacementMinotaur";

export class Minotaur extends Divinite
{
    public readonly name = "Minotaur";
    public readonly slug = "minotaur";
    public readonly description = "Peut pousser un adversaire en se déplaçant sur sa case";

    getDeplacementStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new DeplacementMinotaur(jeu, joueur);
    }
}