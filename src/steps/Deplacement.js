import { Step } from "./Step";

export class Deplacement extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }

    run () {
        return super.run(resolve => {

            this.game.ihm.show('tour');
            this.game.ihm.resume(this.joueur.name, 'se déplacer');

            this.joueur.pions.forEach(pion => {
                pion.emitter.on('picked', pion => {
                    this.joueur.pions.filter(p => p != pion).forEach(p => {
                        p.stopIdle();
                    });
                    pion.toggleIdle();
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

                            if (caze.dernierEtage() && caze.dernierEtage().niveau === "3") {
                                resolve(true);
                            }

                            this.joueur.lastMovedPion = this.game.idlePion();
                            this.game.idlePion().stopIdle();

                            resolve();
                        } catch (e) {
                            this.game.ihm.error(e);
                        }
                    }
                });
            });
        });
    }

    after () {
        this.game.pions.forEach(pion => {pion.emitter.flush()});
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
        this.game.ihm.hide('tour');
    }
}