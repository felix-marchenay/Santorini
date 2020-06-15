import { Steppable } from "../../Infrastructure/Steppable";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";
import { Deplacement } from "../../Steps/Deplacement/Deplacement";
import { Construction } from "../../Steps/Construction/Construction";
import { Preparation } from "../../Steps/Preparation/Preparation";

export abstract class Divinite {
    abstract name: string;
    abstract slug: string;
    abstract description: string;

    getDeplacementStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new Deplacement(jeu, joueur);
    }

    getConstructionStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new Construction(jeu, joueur);
    }

    getPreparationStep(jeu: Jeu, joueur: Joueur): Steppable {
        return new Preparation(jeu, joueur);
    }
}