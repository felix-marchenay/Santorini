import { Step } from "./Step";
import { Victoire } from "../Victoire";

export class Deplacement extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }

    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour(this.joueur, 'se déplacer');

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
                    if (this.game.idlePion()) {
                        try  {
                            if (!this.game.idlePion().case.estAvoisinante(caze)) {
                                throw "La case est trop loin pour s'y rendre";
                            }
                            
                            if (caze.pion !== null) {
                                throw "La case doit être vide pour s'y rendre";
                            }

                            caze.poserPion(this.game.idlePion());

                            this.joueur.lastMovedPion = this.game.idlePion();
    
                            if (this.joueur.isVictorious()) {
                                reject(new Victoire(this.joueur));
                            }
                            this.game.idlePion().stopIdle();
    
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