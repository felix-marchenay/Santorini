import { Step } from "../../Step";
import { Deplacement } from "../../Deplacement";
import { Victoire } from "../../../Victoire";

export class PanDeplacement extends Step {
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }

    run() {
        return super.run((resolve, reject) => {
            this.game.ihm.tour('se déplacer');

            this.game.pionsPickables(this.joueur.pions, pion => {
                
                this.game.casesPickables(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze)),
                    caze => {
                        try {
                            const caseDepart = pion.case;
    
                            caze.poserPion(pion);
            
                            this.game.sendServer('pionMove', pion.export());
        
                            this.joueur.lastMovedPion = pion;
        
                            if (this.joueur.isVictorious()) {
                                this.game.sendVictory(this.joueur);
                                reject(new Victoire(this.joueur));
                            }
                            
                            if (caseDepart.differenceNiveau(caze) >= 2) {
                                this.game.sendVictory(this.joueur);
                                reject(new Victoire(this.joueur));
                            }
                            
                            this.game.endTurn();
                            resolve();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                );
            });
        });
    }
}
