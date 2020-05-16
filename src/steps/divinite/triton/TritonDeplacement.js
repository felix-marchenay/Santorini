import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class TritonDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            const eventsMove = this.game.pionsPickables(this.joueur.pions, pion => {
                this.game.toggleIdle(pion);                    
                this.game.plateau.showMoveHint(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze))
                );
            });
            
            this.game.casesPickables(caze => {
                if (this.game.idlePion()) {
                    const pion = this.game.idlePion();
                    try  {
                        if (!pion.case.estAvoisinante(caze)) {
                            throw "La case est trop loin pour s'y rendre";
                        }
                        
                        if (caze.pion !== null) {
                            throw "La case doit être vide pour s'y rendre";
                        }
    
                        eventsMove.forEach(ev => {
                            this.joueur.pions.forEach(p => p.emitter.off(ev));
                        });
    
                        caze.poserPion(pion);
                        
                        this.game.displaySkip(resolve);
    
                        this.game.sendServer('pionMove', pion.export());
    
                        this.joueur.lastMovedPion = pion;
    
                        if (this.joueur.isVictorious()) {
                            this.game.sendVictory(this.joueur);
                            reject(new Victoire(this.joueur));
                        }
    
                        if (!caze.estDuPerimetre()) {
                            this.game.endTurn();
                            resolve();
                        } 
    
                        this.game.plateau.allCases().forEach(cas => {
                            cas.hideMoveHint();
                        });
                        this.game.plateau.showMoveHint(
                            this.game.plateau.casesAvoisinantes(pion.case).filter(caze => this.game.idlePion().canGo(caze))
                        );
                    } catch (e) {
                        console.log(e);
                        this.game.ihm.error(e);
                    }
                }
            });
        });
    }
}