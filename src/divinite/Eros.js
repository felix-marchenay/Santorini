import { Divinite } from "./Divinite";
import { Deplacement } from "../steps/Deplacement";
import { DistantDeplacement } from "../steps/distant/DistantDeplacement";
import { ErosPreparation } from "../steps/divinite/eros/ErosPreparation";

export class Eros extends Divinite
{
    constructor() {
        super();
        this.name = 'Eros';
        this.slug = 'eros';
        this.description = 'Vous gagnez si vous déplacez votre ouvrier sur un étage de niveau 1 à coté de votre second ouvrier au même niveau';
    }

    getPreparationStep (game, joueur) {
        return [new ErosPreparation(game, joueur)];
    }

    isVictorious(joueur) {
        return joueur.lastMovedPion.case.niveau() === 3 || (
            joueur.lastMovedPion.case.niveau() === 1 && joueur.pionImmobile().case.niveau() === 1 && joueur.lastMovedPion.case.distanceDe(joueur.pionImmobile().case) < 2
        );
    }
}