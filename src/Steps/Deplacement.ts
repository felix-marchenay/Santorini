import { Step } from "./Step";
import { Pion } from "../Model/Pion";
import { Case } from "../Model/Case";

export class Deplacement extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function, reject: Function) => {

            this.jeu.pionsClickables(this.joueur.allPions, (pion: Pion) => {

                this.jeu.casesUnpickables(this.jeu.plateau.allCases);
                
                if (!pion.case) {
                    return;
                }

                this.jeu.casesClickables(
                    this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => pion.peutAller(c)),
                    (caze: Case) => {

                        this.jeu.poser(pion, caze, this.joueur);

                        if (caze.niveau === 3) {
                            this.jeu.victory(this.joueur, reject);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        });
    }
}