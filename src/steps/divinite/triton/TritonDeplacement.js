import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class TritonDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.game.ihm.emitter.on('skip', () => {
                this.game.endTurn();
                resolve();
            });

            const eventsMove = this.joueur.pions.map(pion => {
                return pion.emitter.on('picked', pion => {
                    this.game.toggleIdle(pion);                    
                    this.game.plateau.showMoveHint(
                        this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.canGo(caze))
                    );
                });
            });

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    if (this.game.idlePion()) {
                        try  {
                            if (!this.game.idlePion().case.estAvoisinante(caze)) {
                                throw "La case est trop loin pour s'y rendre";
                            }
                            
                            if (caze.pion !== null) {
                                throw "La case doit être vide pour s'y rendre";
                            }

                            eventsMove.forEach(ev => {
                                this.joueur.pions.filter(p => p.emitter.off(ev));
                            });

                            caze.poserPion(this.game.idlePion());
                            
                            this.game.ihm.showSkip();

                            this.game.sendServer('pionMove', this.game.idlePion().export());

                            this.joueur.lastMovedPion = this.game.idlePion();
    
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
                                this.game.plateau.casesAvoisinantes(this.game.idlePion().case).filter(caze => this.game.idlePion().canGo(caze))
                            );
                        } catch (e) {
                            console.log(e);
                            this.game.ihm.error(e);
                        }
                    }
                });
            });
        });
    }

    after () {
        this.game.pions.forEach(pion => {pion.emitter.flush()});
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
            cas.hideMoveHint();
        });
        this.game.ihm.hideSkip();
    }
}