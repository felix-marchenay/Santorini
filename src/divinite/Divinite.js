import { Deplacement } from "../steps/Deplacement";
import { Construction } from "../steps/Construction";
import { PreparationUnSeulJoueur } from "../steps/PreparationUnJoueur";
import { DistantDeplacement } from "../steps/distant/DistantDeplacement";
import { DistantConstruction } from "../steps/distant/DistantConstruction";
import { DistantPreparation } from "../steps/distant/DistantPreparation";

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

    // Distant steps
    getDistantDeplacementStep (game, joueur) {
        return [new DistantDeplacement(game, joueur)];
    }

    getDistantConstructionStep (game, joueur) {
        return [new DistantConstruction(game, joueur)];
    }

    getDistantPreparationStep (game, joueur) {
        return [new DistantPreparation(game, joueur)];
    }

    isVictorious(pion) {
        return pion.case.niveau() == 3;
    }
}