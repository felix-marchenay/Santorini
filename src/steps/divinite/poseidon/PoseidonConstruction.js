import { Step } from "../../Step";

export class PoseidonConstruction extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }
    
    run () {
        return super.run(resolve => {
            this.game.ihm.tour(this.joueur, 'construire');

            const pion = this.joueur.lastMovedPion;

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    try {
                        if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {

                            if (this.game.ihm.atlasActionMode == 'etage') {
                                caze.build();
                            } else {
                                caze.AtlasBuildDome();
                            }

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

    after () {
        this.game.nextPlayerActive();
        this.game.plateau.hideBuildHint();
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
        });
        this.game.emitter.off('keyDown-Space', this.keydownspace);
        this.game.ihm.hide('action-atlas');
    }
}