import { Step } from "./Step";
import { Pion } from "../Model/Pion";
import { Case } from "../Model/Case";

export class Preparation extends Step
{
    before () {
        super.before();
        this.jeu.tour('poser ses pions');
    }

    run (): Promise<void>  {
        return new Promise<void>(resolve => {

            this.jeu.pionsClickables(this.joueur.allPions, (pion: Pion) => {

                this.jeu.casesUnpickables(this.jeu.plateau.allCases);
                
                this.jeu.casesClickables(
                    this.jeu.plateau.allCases.filter(c => !c.estOccupée),
                    (caze: Case) => {
                        this.joueur.posePion(pion, caze);
                        
                        if (this.joueur.allPions.filter(p => p.case === null).length === 0) {
                            this.jeu.endTurn(resolve);
                        }
                    },
                    false
                );
            });
        });
    }
}