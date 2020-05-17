import { Step } from "../../Step";

export class AtlasConstruction extends Step
{    
    run () {
        return super.run((resolve, reject) => {
            this.game.ihm.tour('construire');

            const pion = this.joueur.lastMovedPion;

            this.game.ihm.emitter.on('switchAtlasMode', mode => {
                this.game.plateau.hideBuildHint();
                if (mode == 'etage') {
                    this.game.plateau.showBuildHintAround(pion.case);
                } else {
                    this.game.plateau.showBuildHintDomeAround(pion.case);
                }
            });

            if (this.game.ihm.atlasBuildMode == 'etage') {
                this.game.plateau.showBuildHintAround(pion.case);
            } else {
                this.game.plateau.showBuildHintDomeAround(pion.case);
            }
            
            this.game.casesPickables(
                this.game.plateau.casesAvoisinantes(pion.case),
                caze => {
                    try {
                        if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {
                            if (this.game.ihm.atlasBuildMode == 'etage') {
                                caze.build();
                                this.game.sendServer('construct', caze.export());
                            } else {
                                caze.AtlasBuildDome();
                                this.game.sendServer('constructDome', caze.export());
                            }

                            this.game.checkVictoryAfterBuild(reject);
        
                            this.game.endTurn();
                            resolve();
                        }
                    } catch (e) {
                        console.log(e);
                        this.game.ihm.error(e);
                    }
                }
            );
        });
    }
}