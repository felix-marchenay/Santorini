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
                this.game.toggleIdle(pion);
            });
    

            this.game.casesPickables(caze => {
                if (this.game.idlePion()) {
                    try {
                        if (!this.game.idlePion().case.estAvoisinante(caze)) {
                            throw "La case est trop loin pour s'y rendre";
                        }

                        if (caze.pion !== null) {
                            throw "La case doit être vide pour s'y rendre";
                        }

                        const caseDepart = this.game.idlePion().case;

                        caze.poserPion(this.game.idlePion());

                        this.game.sendServer('pionMove', this.game.idlePion().export());

                        if (caseDepart.differenceNiveau(caze) >= 2) {
                            this.game.sendVictory(this.joueur);
                            reject(new Victoire(this.joueur));
                        }

                        this.joueur.lastMovedPion = this.game.idlePion();
    
                        if (this.joueur.isVictorious()) {
                            this.game.sendVictory(this.joueur);
                            reject(new Victoire(this.joueur));
                        }
                        
                        this.game.endTurn();
                        resolve();
                    } catch (e) {
                        console.log(e);
                        this.game.ihm.error(e);
                    }
                }
            });
        });
    }
}
