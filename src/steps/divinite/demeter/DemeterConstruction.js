import { Step } from "../../Step";

export class DemeterConstruction extends Step
{    
    run () {
        return super.run((resolve, reject) => {
            
            this.game.ihm.tour('construire');

            const pion = this.joueur.lastMovedPion;

            this.game.plateau.showBuildHintAround(pion.case);

            let premiereConstruction = null;

            this.game.casesPickables(
                this.game.plateau.casesAvoisinantes(pion.case),
                caze => {
                try {
                    if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {
                        
                        if (premiereConstruction === caze) {
                            throw "Pas sur la même case";
                        }

                        caze.build();

                        this.game.checkVictoryAfterBuild(reject);
    
                        this.game.sendServer('construct', caze.export());

                        if (premiereConstruction === null) {
                            premiereConstruction = caze;
                            this.game.displaySkip(resolve);
                        } else {
                            this.game.endTurn();
                            resolve();
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.game.ihm.error(e);
                }
            });
        });
    }
}