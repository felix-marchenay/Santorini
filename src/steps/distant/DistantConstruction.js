import { Step } from "../Step";

export class DistantConstruction extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour(this.joueur, 'construire');

        });
    }

    after () {
        this.game.plateau.allCases().forEach(cas => {
            cas.emitter.flush();
            cas.hideBuildHint();
        });
        this.game.ihm.hide('info');
    }
}