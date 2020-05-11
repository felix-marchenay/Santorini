import { Step } from "../Step";

export class DistantDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour(this.joueur, 'se déplacer');

        });
    }

    after () {
    }
}