import { Deplacement } from "../steps/Deplacement";
import { Construction } from "../steps/Construction";
import { PreparationUnSeulJoueur } from "../steps/PreparationUnJoueur";

export class Divinite
{
    getDeplacementStep (game, joueur) {
        return [new Deplacement(game, joueur)];
    }

    getConstructionStep (game, joueur) {
        return [new Construction(game, joueur)];
    }

    getPreparationStep (game, joueur) {
        return [new PreparationUnSeulJoueur(game, joueur)];
    }

    isVictorious(pion) {
        return pion.case.niveau() == 3;
    }
}