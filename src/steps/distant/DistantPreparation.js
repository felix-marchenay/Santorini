import { Step } from "../Step";

export class DistantPreparation extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour(this.joueur, 'placer ses pions');

            this.game.server.emitter.on('idlePion', pion => {

                pion = this.game.findPionById(pion.id);

                this.game.pions.filter(p => p != pion).forEach(p => {
                    p.stopIdle();
                });

                pion.toggleIdle();
            });

            this.game.server.emitter.on('pionMove', data => {
                const pion = this.game.findPionById(data.id);

                const caze = this.game.findCaseByCoordinates(data.position);

                caze.poserPion(pion);

                const joueur = this.game.joueurs.find(j => {
                    const pionFound = j.pions.find(p => p.id == data.id);
                    if (pionFound) {
                        return true;
                    }

                    return false;
                });

                console.log(joueur);

                if (joueur.pions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });

        });
    }

    after () {
    }
}