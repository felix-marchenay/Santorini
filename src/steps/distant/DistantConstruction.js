import { Step } from "../Step";

export class DistantConstruction extends Step
{
    run () {
        return super.run((resolve, reject) => {
            
            this.game.ihm.tour('construire');

            this.game.server.emitter.on('construct', data => {
                const caze = this.game.findCaseByCoordinates(data);
                caze.build();
                if (caze.pion) {
                    caze.poserPion(caze.pion);
                }
            });

            this.game.server.emitter.on('constructDome', data => {
                const caze = this.game.findCaseByCoordinates(data);
                caze.AtlasBuildDome();
            });

            this.game.checkVictoryAfterBuild(reject);

            this.game.server.emitter.on('endTurn', () => {
                resolve();
            });

        });
    }
}