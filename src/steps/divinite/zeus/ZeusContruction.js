import { Step } from "../../Step";

export class ZeusConstruction extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour('construire');

            const pion = this.joueur.lastMovedPion;
            
            this.game.plateau.showBuildHintZeusAround(pion.case);

            this.game.casesPickables(
                this.game.plateau.casesAvoisinantesEtElleMeme(pion.case),
                caze => {
                try {
                    if (caze.isBuildable() || caze == pion.case) {
                        caze.build();
                        if (caze == pion.case) {
                            caze.poserPionForce(pion);
                        }
    
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