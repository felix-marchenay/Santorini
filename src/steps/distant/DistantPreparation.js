import { Step } from "../Step";

export class DistantPreparation extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('placer ses pions');

            this.game.server.emitter.on('idlePion', data => {

                const pion = this.game.findPionById(data.data.id);

                this.game.pions.filter(p => p != pion).forEach(p => {
                    p.stopIdle();
                });

                pion.toggleIdle();
            });

            this.game.server.emitter.on('pionMove', data => {
                const pion = this.game.findPionById(data.data.id);

                const caze = this.game.findCaseByCoordinates(data.data.position);

                caze.poserPion(pion);

                const joueur = this.game.joueurs.find(j => j.id == data.joueur);

                if (joueur.pions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });

        });
    }

    after () {
        this.game.server.emitter.flush();
    }
}