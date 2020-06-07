import { Step } from "./Step";

export class DeplacementDistant extends Step
{    
    before () {
        super.before();
        this.jeu.tour("se déplacer d'une case");
    }

    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {

            this.jeu.server?.on('pionMove', data => {
                const pion = this.jeu.findPionById(data.data.id);

                const caze = this.jeu.plateau.getCase(data.data.position.x, data.data.position.y);

                this.joueur.posePion(pion, caze);
            });

            this.jeu.server?.on('pionMoveForce', data => {
                const pion = this.jeu.findPionById(data.data.id);

                const caze = this.jeu.plateau.getCase(data.data.position.x, data.data.position.y);
                
                this.joueur.posePion(pion, caze);
            });

            this.jeu.server?.on('pionSwitch', pions => {
                pions;
                // const pion1 = this.jeu.findPionById(pions[0].id);
                // const pion2 = this.jeu.findPionById(pions[1].id);
                // pion1.switchWith(pion2);
            });

            this.jeu.server?.on('endTurn', () => {
                resolve();
            });

            this.jeu.server?.on('victory', data => {
                this.jeu.victory(this.jeu.findJoueurById(data.joueur.id));
            });

        });
    }
}