import { Step } from "../Step";
import { Pion } from "../../Model/Pion";
import { Case } from "../../Model/Case";

export class DeplacementTriton extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {

            this.jeu.pionsClickables(this.joueur.allPions, (pion: Pion) => {
                
                this.jeu.casesUnpickables(this.jeu.plateau.allCases);

                this.casesAvoisinantesClickables(pion, resolve);
            });
        });
    }

    private casesAvoisinantesClickables(pion: Pion, resolve: Function) {
        if (!pion.case) {
            return;
        }

        this.jeu.casesClickables(
            this.jeu.plateau.casesAvoisinantes(pion.case).filter(caze => pion.peutAller(caze)),
            (caze: Case) => {
                try {
                    this.jeu.pionsUnclickables(this.jeu.pions);

                    this.jeu.poser(pion, caze, this.joueur);
                    
                    this.jeu.displaySkip(resolve);

                    if (caze.niveau === 3) {
                        this.jeu.victory(this.joueur);
                    }

                    if (!caze.estDuPerimetre) {
                        this.jeu.endTurn(resolve);
                    }

                    this.jeu.casesUnpickables(this.jeu.plateau.allCases);

                    this.casesAvoisinantesClickables(pion, resolve);
                } catch (e) {
                    console.error(e);
                }
            }
        );
    }
}