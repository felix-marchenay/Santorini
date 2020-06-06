import { Step } from "./Step";

export class AutoPreparation extends Step
{
    before () {
        super.before();
        this.jeu.tour('poser ses pions');
    }

    run (): Promise<void>  {
        return new Promise<void>(resolve => {

            this.jeu.construire(this.jeu.plateau.getCase(3, 1));

            this.jeu.poser(this.jeu.joueurs[0].allPions[0], this.jeu.plateau.getCase(1, 4), this.jeu.joueurs[0]);
            this.jeu.poser(this.jeu.joueurs[0].allPions[1], this.jeu.plateau.getCase(2, 5), this.jeu.joueurs[0]);

            this.jeu.poser(this.jeu.joueurs[1].allPions[0], this.jeu.plateau.getCase(3, 1), this.jeu.joueurs[1]);
            this.jeu.poser(this.jeu.joueurs[1].allPions[1], this.jeu.plateau.getCase(2, 3), this.jeu.joueurs[1]);
            
            this.jeu.construire(this.jeu.plateau.getCase(3, 3));
            this.jeu.construire(this.jeu.plateau.getCase(3, 3));

            this.jeu.construire(this.jeu.plateau.getCase(3, 4));

            this.jeu.construire(this.jeu.plateau.getCase(1, 1));
            this.jeu.construire(this.jeu.plateau.getCase(1, 1));
            this.jeu.construire(this.jeu.plateau.getCase(1, 1));

            resolve();
        });
    }
}