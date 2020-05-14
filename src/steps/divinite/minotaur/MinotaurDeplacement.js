import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class MinotaurDeplacement extends Step
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

            this.game.plateau.allCases().forEach(caseCible => {
                caseCible.emitter.on('pointerPicked', () => {
                    if (this.game.idlePion()) {
                        try  {
                            if (!this.game.idlePion().case.estAvoisinante(caseCible)) {
                                throw "La case est trop loin pour s'y rendre";
                            }
                            
                            if (caseCible.pion !== null) {
                                this.game.plateau.caseSuivante(this.game.idlePion().case, caseCible).poserPionForce(caseCible.pion);
                                this.game.sendServer('pionMoveForce', caseCible.pion.export());
                            }

                            caseCible.poserPion(this.game.idlePion());

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
        });
    }

    after () {
        this.game.pions.forEach(pion => {pion.emitter.flush()});
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
            cas.hideMoveHint();
        });
    }
}