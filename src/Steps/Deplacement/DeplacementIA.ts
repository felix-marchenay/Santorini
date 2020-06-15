import { Step } from "../Step";
import { Pion } from "../../Model/Pion";

export class DeplacementIA extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {

            setTimeout(() => {

                let pionQuiPeutAllerPlusHaut = this.joueur.allPions.reduce((carry: Pion, current: Pion) => {
                    const carryH = this.jeu.plateau.casesLaPlusHauteOuPionPeutAller(carry);
                    const currentH = this.jeu.plateau.casesLaPlusHauteOuPionPeutAller(current);

                    if (carryH.niveau > currentH.niveau) {
                        return carry;
                    }

                    return current;
                });

                const caseDepart = pionQuiPeutAllerPlusHaut.case;
                const caseArrivee = this.jeu.plateau.casesLaPlusHauteOuPionPeutAller(pionQuiPeutAllerPlusHaut);

                this.jeu.poser(pionQuiPeutAllerPlusHaut, caseArrivee, this.joueur);

                if (caseDepart && caseArrivee.differenceDeNiveauAvec(caseDepart) === 1 && caseArrivee.niveau === 3) {
                    this.jeu.victory(this.joueur);
                } else {
                    this.jeu.endTurn(resolve);
                }
            }, 200);
        });
    }
}