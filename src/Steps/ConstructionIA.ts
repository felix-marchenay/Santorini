import { Step } from "./Step";

export class ConstructionIA extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {

            setTimeout(() => {
                const adversaire = this.jeu.adversaire(this.joueur);
    
                if (adversaire.allPions
                    .filter(p => p.case && p.case.niveau === 2 && this.jeu.plateau.casesAvoisinantes(p.case).filter(c => c.niveau === 3).length > 0)
                    .length > 0
                ) {
                    // Todo Si adversaire pret à gagner, aller construire un dome
                }
    
                const pion = this.joueur.dernierPionDéplacé;
    
                if (!pion || !pion.case) {
                    throw "Comment il en est arrivé là ?";
                }
    
                const casesVoisines = this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => c.constructible);
                
                casesVoisines[Math.floor(Math.random() * casesVoisines.length)].construire();
    
                resolve();
            }, 800);
        });
    }
}