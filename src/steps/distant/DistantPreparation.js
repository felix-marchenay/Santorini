import { Step } from "../Step";

export class DistantPreparation extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour(this.joueur, 'placer ses pions');

            this.game.server.emitter.on('idlePion', pion => {
                console.log(pion);

                pion = this.game.findPionById(pion.id);

                console.log(pion);

                this.game.pions.filter(p => p != pion).forEach(p => {
                    p.stopIdle();
                });

                pion.toggleIdle();
            });

        });
    }

    after () {
    }
}