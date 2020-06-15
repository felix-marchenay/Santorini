import { Divinite } from "./Divinite";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";
import { Steppable } from "../../Infrastructure/Steppable";
import { ConstructionAtlas } from "../../Steps/Construction/ConstructionAtlas";

export class Atlas extends Divinite
{
    public readonly name = "Atlas";
    public readonly slug = "atlas";
    public readonly description = "Il peut construire un dôme sur n'importe quel étage";

    getConstructionStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new ConstructionAtlas(jeu, joueur);
    }
}