import { Step } from "../Step";
import { Case } from "../../Model/Case";

export class DeplacementApollon extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {

            this.jeu.pionsClickables(this.joueur.allPions, pion => {      
                
                if (!pion.case) {
                    return;
                }

                this.jeu.casesClickables(
                    this.jeu.plateau.casesAvoisinantes(pion.case).filter(caze => pion.apollonPeutAller(caze)),
                    (caze: Case) => {
                        const caseDepart = pion.case;
                        const pionTarget = caze.pion;
                        if (pionTarget !== null) {
                            pionTarget.echangerPlace(pion);
                            this.jeu.sendServer('echangerPlace', [pion.export(), pionTarget.export()]);
                        } else {
                            caze.poser(pion);
                            this.jeu.sendServer('deplacerPion', pion.export());
                        }

                        this.joueur.dernierPionDéplacé = pion;
                        
                        if (caseDepart && caze.differenceDeNiveauAvec(caseDepart) === 1 && caze.niveau === 3) {
                            this.jeu.victory(this.joueur);
                        } else {
                            this.jeu.endTurn(resolve);
                        }
                    }
                );
            });
        });
    }
}