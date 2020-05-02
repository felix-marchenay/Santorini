import { Step } from "./Step";

export class Construction extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.show('tour');
            this.game.ihm.resume(this.game.activePlayer().name, 'construire');

            const pion = this.game.activePlayer().lastMovedPion;

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    try {
                        if (!pion.case.estAvoisinante(caze)) {
                            throw "La case est trop loin pour construire";
                        }
                        caze.build();
                        resolve();
                    } catch (e) {
                        this.game.ihm.error(e);
                    }
                });
            });
        });
    }

    after () {
        this.game.nextPlayerActive();
        this.game.plateau.allCases().forEach(cas => {cas.emitter.flush()});
        this.game.ihm.hide('tour');
    }
}