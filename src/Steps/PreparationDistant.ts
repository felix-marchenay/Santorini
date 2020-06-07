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
                const pion = this.jeu.findPionById(data.data.id);

                const caze = this.jeu.plateau.getCase(data.data.position.x, data.data.position.y);

                this.joueur.posePion(pion, caze);

                if (this.joueur.allPions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });
        });
    }
}