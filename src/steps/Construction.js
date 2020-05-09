import { Step } from "./Step";

export class Construction extends Step
{    
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour(this.joueur, 'construire');

            const pion = this.joueur.lastMovedPion;

            this.game.plateau.showBuildHintAround(pion.case);

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    try {
                        if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {
                            caze.build();

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
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
            cas.hideBuildHint();
        });
        this.game.ihm.hide('info');
    }
}