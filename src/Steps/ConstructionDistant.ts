import { Step } from "./Step";

export class ConstructionDistant extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {
            
            this.jeu.server?.on('construire', data => {
                const caze = this.jeu.plateau.getCase(data.x, data.y)
                
                caze.construireSousLePion();
            });

            this.jeu.server?.on('constructDome', data => {
                this.jeu.plateau.getCase(data.x, data.y).construireDome();
            });

            this.jeu.server?.on('victory', data => {
                this.jeu.victory(this.jeu.findJoueurById(data.id));
            });

            this.jeu.server?.on('endTurn', () => {
                resolve();
            });
        });
    }
}