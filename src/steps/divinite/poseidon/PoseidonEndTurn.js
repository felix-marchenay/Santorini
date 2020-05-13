import { Step } from "../../Step";

export class PoseidonEndTurn extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }

    run () {
        return super.run(resolve => {

            this.game.ihm.tour('construire sur le personnage immobile');
            this.game.ihm.showSkip();
            this.game.ihm.emitter.on('skip', () => {
                this.game.endTurn();
                resolve();
            });

            const pionImmobile = this.joueur.pions.find(p => p != this.joueur.lastMovedPion);

            if (pionImmobile.case.niveau() !== 0) {
                this.game.endTurn();
                resolve();
            }

            this.game.plateau.showBuildHintAround(pionImmobile.case);

            let nbConstructions = 0;
            this.game.onClickCaseAvoisinantes(pionImmobile, cas => {

                if (cas.isBuildable()) {
                    cas.build();

                    this.game.plateau.refreshBuildHint(cas);
                    nbConstructions ++;
                    
                    this.game.sendServer('construct', cas.export());
                }

                if (nbConstructions >= 3) {
                    this.game.endTurn();
                    resolve();
                }
            });
        });
    }

    after() {
        this.game.flushEventsCases();
        this.game.hideAllBuildHint();
        this.game.ihm.hideSkip();
        this.game.ihm.emitter.flush();
    }
}