import { Step } from "./Step";

export class PreparationDistant extends Step
{
    before () {
        super.before();
        this.jeu.tour('poser ses pions');
    }

    run (): Promise<void>  {
        return new Promise<void>(resolve => {

            this.jeu.server?.on('pionMove', data => {
                const pion = this.jeu.pionById(data.data.id);

                if (pion === undefined) {
                    resolve();
                    return;
                }

                const caze = this.jeu.plateau.getCase(data.data.position.x, data.data.position.x);

                this.jeu.poser(pion, caze, this.joueur);

                if (this.joueur.allPions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });
        });
    }
}