import { Divinite } from "./Divinite";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";
import { Steppable } from "../../Infrastructure/Steppable";
import { ConstructionZeus } from "../../Steps/ConstructionZeus";

export class Zeus extends Divinite
{
    public readonly name = "Zeus";
    public readonly slug = "zeus";
    public readonly description = "Peut construire sous l'ouvrier déplacé. Ne peux pas gagner en montant au niveau 3 de cette manière";

    getConstructionStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new ConstructionZeus(jeu, joueur);
    }
}