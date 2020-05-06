import { Step } from "./Step";

export class AutoPreparation extends Step
{    
    run () {
        return super.run(resolve => {
            const position = [
                [0, 2],
                [1, 3],
                [2, 2],
                [4, 4]
            ];

            console.log(this.game.pions);
            this.game.pions.forEach((pion, i) => {
                this.game.plateau.getCase(...position[i]).poserPion(pion);
            });

            resolve();
        });
    }

    after() {
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
    }
}