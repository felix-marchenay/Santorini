import { Step } from "./Step";
import { Victoire } from "../Victoire";

export class Deplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.joueur.pions.forEach(pion => {
                pion.emitter.on('picked', pion => {
                    this.joueur.pions.filter(p => p != pion).forEach(p => {
                        p.stopIdle();
                    });
                    pion.toggleIdle();
                    
                    this.game.plateau.showMoveHint(
                        this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze))
                    );
                });
            });

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    const pion = this.game.idlePion();
                    if (pion) {
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
                });
            });
        });
    }
}