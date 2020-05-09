import { Step } from "../../Step";

export class PoseidonEndTurn extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }

    run () {
        return super.run(resolve => {

            this.game.ihm.tour(this.joueur, 'construire sur le personnage immobile');
            this.game.ihm.showSkip();
            this.game.ihm.emitter.on('skip', resolve);

            const pionImmobile = this.joueur.pions.find(p => p != this.joueur.lastMovedPion);

            if (pionImmobile.case.niveau() !== 0) {
                resolve();
            }

            this.game.plateau.showBuildHintAround(pionImmobile.case);

            let nbConstructions = 0;
            this.game.onClickCaseAvoisinantes(pionImmobile, cas => {

                if (cas.isBuildable()) {
                    cas.build();
                    this.game.hideAllBuildHint();
                    this.game.plateau.showBuildHintAround(pionImmobile.case);
                    nbConstructions ++;
                }

                if (nbConstructions >= 3) {
                    resolve();
                }
            });
        });
    }

    after() {
        this.game.flushEventsCases();
        this.game.hideAllBuildHint();
        this.game.ihm.hideSkip();
    }
}