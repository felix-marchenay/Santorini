import { Step } from "./Step";

export class Construction extends Step
{    
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour('construire');

            const pion = this.joueur.lastMovedPion;

            this.game.plateau.showBuildHintAround(pion.case);

            this.game.casesPickables(
                this.game.plateau.casesAvoisinantes(pion.case),
                caze => {
                try {
                    if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {
                        caze.build();
    
                        this.game.sendServer('construct', caze.export());
    
                        this.game.endTurn();
                        resolve();
                    }
                } catch (e) {
                    console.log(e);
                    this.game.ihm.error(e);
                }
            });
        });
    }
}