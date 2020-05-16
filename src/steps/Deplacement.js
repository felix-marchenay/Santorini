import { Step } from "./Step";
import { Victoire } from "../Victoire";

export class Deplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.game.pionsPickables(this.joueur.pions, pion => {
                this.game.casesUnpickables();
                this.joueur.pions.filter(p => p != pion).forEach(p => {
                    p.stopIdle();
                });
                pion.toggleIdle();

                pion = this.game.idlePion();

                if (!pion) {
                    return;
                }
                
                this.game.casesPickables(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze)),
                    caze => {
                        try  {
                            if (!pion.case.estAvoisinante(caze)) {
                                throw "La case est trop loin pour s'y rendre";
                            }
                            
                            if (caze.pion !== null) {
                                throw "La case doit être vide pour s'y rendre";
                            }
        
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