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
            });

            this.game.server.emitter.on('pionMoveForce', data => {
                const pion = this.game.findPionById(data.data.id);
                const caze = this.game.findCaseByCoordinates(data.data.position);
                caze.poserPionForce(pion);
            });

            this.game.server.emitter.on('pionSwitch', pions => {
                const pion1 = this.game.findPionById(pions[0].id);
                const pion2 = this.game.findPionById(pions[1].id);
                pion1.switchWith(pion2);
            });

            this.game.server.emitter.on('endTurn', () => {
                resolve();
            });

            this.game.server.emitter.on('victory', data => {
                reject(new Victoire(this.game.findJoueurById(data.joueur.id)));
            });

        });
    }
}