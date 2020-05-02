import { Step } from "./Step";

export class AutoPreparation extends Step
{    
    run () {
        return super.run(resolve => {
            this.game.pions.forEach(pion => {
                pion.emitter.on('picked', pion => {
                    this.game.pions.filter(p => p != pion).forEach(p => {
                        p.stopIdle();
                    });
                    if (pion.case === null) {
                        pion.toggleIdle();
                    }
                });
            });

            const position = [
                [0, 2],
                [1, 3],
                [2, 2],
                [4, 4]
            ];

            this.game.pions.forEach((pion, i) => {
                this.game.plateau.getCase(...position[i]).poserPion(pion);
            });

            resolve();
        });
    }

    after() {
        this.game.pions.forEach(pion => {pion.emitter.flush()});
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
    }
}