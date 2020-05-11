import { Step } from "../Step";

export class DistantDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour(this.joueur, 'se déplacer');

            this.game.server.emitter.on('pionMove', data => {
                const pion = this.game.findPionById(data.data.id);

                const caze = this.game.findCaseByCoordinates(data.data.position);

                caze.poserPion(pion);

                const joueur = this.game.joueurs.find(j => j.id == data.joueur);

                resolve();
            });

        });
    }

    after () {
        this.game.server.emitter.flush();
    }
}