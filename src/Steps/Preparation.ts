import { Step } from "./Step";
import { Pion } from "../Model/Pion";
import { Case } from "../Model/Case";

export class Preparation extends Step
{
    run (): Promise<void>  {
        return new Promise<void>(resolve => {

            this.jeu.pionsClickables(this.joueur.allPions, (pion: Pion) => {

                this.jeu.casesUnpickables(this.jeu.plateau.allCases);
                
                this.jeu.casesClickables(
                    this.jeu.plateau.allCases.filter(c => !c.estOccupée),
                    (caze: Case) => {
                        caze.poser(pion);
                        
                        if (this.joueur.allPions.filter(p => p.case === null).length === 0) {
                            resolve();
                        }
                    }
                );
            });
        });
    }
}