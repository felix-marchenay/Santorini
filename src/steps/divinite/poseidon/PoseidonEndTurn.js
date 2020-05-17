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

            this.game.displaySkip(resolve);

            const pionImmobile = this.joueur.pionImmobile();

            if (pionImmobile.case.niveau() !== 0) {
                this.game.endTurn();
                resolve();
            }

            this.game.plateau.showBuildHintAround(pionImmobile.case);

            let nbConstructions = 0;
            this.game.casesPickables(
                this.game.plateau.casesAvoisinantes(pionImmobile.case),
                cas => {
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
                }
            );
        });
    }
}