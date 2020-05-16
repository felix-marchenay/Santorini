import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class MinotaurDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.game.pionsPickables(this.joueur.pions, pion => {
                this.joueur.pions.filter(p => p != pion).forEach(p => {
                    p.stopIdle();
                });
                pion.toggleIdle();
                
                this.game.plateau.showMoveHint(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze))
                );
            });

            this.game.casesPickables(caze => { 
                if (this.game.idlePion()) {
                    try  {
                        if (!this.game.idlePion().case.estAvoisinante(caze)) {
                            throw "La case est trop loin pour s'y rendre";
                        }
    
                        const pionCible = caze.pion;
                        
                        if (pionCible !== null) {
                            this.game.plateau.caseSuivante(this.game.idlePion().case, caze).poserPionForce(pionCible);
                            this.game.sendServer('pionMoveForce', pionCible.export());
                        }
    
                        caze.poserPion(this.game.idlePion());
    
                        this.game.sendServer('pionMove', this.game.idlePion().export());
    
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