import { Step } from "../Step";

export class DistantConstruction extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour(this.joueur, 'construire');

            this.game.server.emitter.on('construct', data => {
                const caze = this.game.findCaseByCoordinates(data);
                caze.build();
            });

            this.game.server.emitter.on('endTurn', () => {
                resolve();
            });

        });
    }

    after () {
        this.game.server.emitter.flush();
    }
}