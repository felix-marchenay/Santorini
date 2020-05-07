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

            this.game.pions.forEach((pion, i) => {
                if (i == 1) {
                    const lv3 = this.game.plateau.allCases().filter(cas => cas.niveau() == 2);
                    if (lv3.length > 0) {
                        lv3[0].poserPion(pion);
                    } else {
                        this.game.plateau.getCase(position[i][0], position[i][1]);
                    }
                } else if (i == 2) {
                    const lv1 = this.game.plateau.allCases().filter(cas => cas.niveau() == 1);
                    if (lv1.length > 0) {
                        lv1[0].poserPion(pion);
                    }
                } else {
                    this.game.plateau.getCase(Math.floor(Math.random()*4.9), Math.floor(Math.random()*4.9)).poserPion(pion);
                }
            });

            resolve();
        });
    }

    after() {
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
    }
}