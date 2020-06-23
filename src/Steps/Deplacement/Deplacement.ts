import { Step } from "../Step";
import { Pion } from "../../Model/Pion";
import { Case } from "../../Model/Case";
import { DéplacerPion } from "../../Command/DéplacerPion";

export class Deplacement extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {

            if(this.joueur.allPions[0].case && this.joueur.allPions[1].case) {
                const casesPossibles = [
                    ...this.jeu.plateau.casesAvoisinantes(this.joueur.allPions[0].case).filter(c => this.joueur.allPions[0].peutAller(c)),
                    ...this.jeu.plateau.casesAvoisinantes(this.joueur.allPions[1].case).filter(c => this.joueur.allPions[1].peutAller(c)),
                ];

                if (casesPossibles.length < 1) {
                    this.jeu.victory(this.jeu.adversaire(this.joueur));
                }
            }

            this.jeu.pionsClickables(this.joueur.allPions, (pion: Pion) => {

                this.jeu.casesUnpickables(this.jeu.plateau.allCases);
                
                if (!pion.case) {
                    return;
                }

                this.jeu.casesClickables(
                    this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => pion.peutAller(c)),
                    (caze: Case) => {
                        const caseDepart = pion.case;

                        this.commandBus.execute(new DéplacerPion(pion, caze, this.joueur, this.jeu));

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