import { Step } from "../Step";
import { Construire } from "../../Command/Construire";
import { DéplacerPion } from "../../Command/DéplacerPion";

export class AutoPreparation extends Step
{
    before () {
        super.before();
        this.jeu.tour('poser ses pions');
    }

    run (): Promise<void>  {
        return new Promise<void>(resolve => {

            this.commandBus.execute(
                new Construire(this.jeu, this.jeu.plateau.getCase(3, 1)),
                new Construire(this.jeu, this.jeu.plateau.getCase(3, 3)),
                new Construire(this.jeu, this.jeu.plateau.getCase(3, 4)),
                new Construire(this.jeu, this.jeu.plateau.getCase(1, 1)),
                new Construire(this.jeu, this.jeu.plateau.getCase(1, 1)),
                new DéplacerPion(this.jeu.joueurs[0].allPions[0], this.jeu.plateau.getCase(1, 4), this.jeu.joueurs[0], this.jeu),
                new DéplacerPion(this.jeu.joueurs[0].allPions[1], this.jeu.plateau.getCase(2, 5), this.jeu.joueurs[0], this.jeu),
                new DéplacerPion(this.jeu.joueurs[1].allPions[0], this.jeu.plateau.getCase(3, 1), this.jeu.joueurs[1], this.jeu),
                new DéplacerPion(this.jeu.joueurs[1].allPions[1], this.jeu.plateau.getCase(2, 3), this.jeu.joueurs[1], this.jeu),
            );

            resolve();
        });
    }
}