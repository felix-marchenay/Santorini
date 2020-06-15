import { Step } from "../Step";

export class PreparationIA extends Step
{
    before () {
        super.before();
        this.jeu.tour('poser ses pions');
    }

    run (): Promise<void>  {
        return new Promise<void>(resolve => {
            const premierPion = this.joueur.allPions[0];

            let cases = this.jeu.plateau.casesDisponibles();

            this.jeu.poser(premierPion, cases[Math.floor(Math.random()*cases.length)], this.joueur);

            setTimeout(() => {
                const deuxiemePion = this.joueur.allPions[1];
    
                cases = this.jeu.plateau.casesDisponibles();
    
                this.jeu.poser(deuxiemePion, cases[Math.floor(Math.random()*cases.length)], this.joueur);
    
                resolve();
            }, 500);
        });
    }
}