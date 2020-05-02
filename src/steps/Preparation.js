import { Step } from "./Step";

export class Preparation extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.show('info');
            this.game.ihm.info('Placez vos pions');
            
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

            this.game.plateau.allCases().forEach(cas => {
                cas.emitter.on('pointerPicked', () => {
                    if (this.game.idlePion()) {
                        cas.poserPion(this.game.idlePion());
                        this.game.idlePion().stopIdle();
                    }

                    if (this.game.pions.filter(p => p.case === null).length === 0) {
                        resolve();
                    }
                });
            });
        });
    }

    after() {
        this.game.pions.forEach(pion => {pion.emitter.flush()});
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
    }
}