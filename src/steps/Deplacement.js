import { Step } from "./Step";
import { Victoire } from "../Victoire";

export class Deplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.game.pionsPickables(this.joueur.pions, pion => {

                this.game.toggleIdle(pion);

                pion = this.game.idlePion();

                if (!pion) {
                    return;
                }
                
                this.game.casesPickables(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze)),
                    caze => {
                        try  {
        
                            caze.poserPion(pion);
        
                            this.game.sendServer('pionMove', pion.export());
        
                            this.joueur.lastMovedPion = pion;
        
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
                );
            });
        });
    }
}