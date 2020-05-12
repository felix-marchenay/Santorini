import { Step } from "../Step";
import { Victoire } from "../../Victoire";

export class DistantDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer');

            this.game.server.emitter.on('pionMove', data => {
                const pion = this.game.findPionById(data.data.id);

                const caze = this.game.findCaseByCoordinates(data.data.position);

                caze.poserPion(pion);

                const joueur = this.game.joueurs.find(j => j.id == data.joueur);
            });

            this.game.server.emitter.on('endTurn', () => {
                resolve();
            });

            this.game.server.emitter.on('victory', data => {
                reject(new Victoire(this.game.findJoueurById(data.joueur.id)));
            });

        });
    }

    after () {
        this.game.server.emitter.flush();
    }
}