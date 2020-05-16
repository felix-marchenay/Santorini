import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class TritonDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            const eventsMove = this.game.pionsPickables(this.joueur.pions, pion => {
                this.game.toggleIdle(pion);

                pion = this.game.idlePion();

                this.game.casesUnpickables();

                if (!pion) {
                    return;
                }

                this.game.casesPickables(
                    // this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze)), 
                    caze => {
                        try  {
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
                        } catch (e) {
                            console.log(e);
                            this.game.ihm.error(e);
                        }
                });
            });
            
            
        });
    }

    clickCase(caze) {
        try  {
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
        } catch (e) {
            console.log(e);
            this.game.ihm.error(e);
        }
    }
}