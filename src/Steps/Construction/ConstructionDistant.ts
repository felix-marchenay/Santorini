import { Step } from "../Step";

export class ConstructionDistant extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {
            
            this.jeu.server?.on('construire', data => {
                this.jeu.plateau.getCase(data.x, data.y).construireSousLePion();
            });

            this.jeu.server?.on('construireDome', data => {
                this.jeu.plateau.getCase(data.x, data.y).construireDome();
            });

            this.jeu.server?.on('victory', data => {
                this.jeu.receiveVictory(this.jeu.findJoueurById(data.id));
            });

            this.jeu.server?.on('endTurn', () => {
                resolve();
            });
        });
    }
}