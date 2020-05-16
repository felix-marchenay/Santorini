import { Step } from "../../Step";

export class AtlasConstruction extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }
    
    run () {
        return super.run(resolve => {
            this.game.ihm.tour('construire');

            const pion = this.joueur.lastMovedPion;

            this.keydownspace = this.game.emitter.on('keyDown-Space', () => {this.game.ihm.switchAtlasMode()});

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
            this.game.casesPickables(caze => {
                try {
                    if (caze.isBuildable() && caze.estAvoisinante(pion.case)) {
                        if (this.game.ihm.atlasBuildMode == 'etage') {
                            caze.build();
                            this.game.sendServer('construct', caze.export());
                        } else {
                            caze.AtlasBuildDome();
                            this.game.sendServer('constructDome', caze.export());
                        }
    
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

    after () {
        this.game.plateau.hideBuildHint();
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
        });
        this.game.ihm.emitter.flush();
        this.game.emitter.off('keyDown-Space', this.keydownspace);
    }
}