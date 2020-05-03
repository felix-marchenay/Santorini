import { Step } from "./Step";

export class Construction extends Step
{
    constructor(game, joueur) {
        super(game);
        this.joueur = joueur;
    }
    
    run () {
        return super.run(resolve => {
            this.game.ihm.show('tour');
            this.game.ihm.resume(this.joueur.name, 'construire');

            const pion = this.joueur.lastMovedPion;

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