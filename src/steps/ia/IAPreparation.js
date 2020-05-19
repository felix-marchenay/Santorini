import { Step } from "../Step";

export class IAPreparation extends Step
{
    run () {
        return super.run(resolve => {
            const premierPion = this.joueur.pions.find(p => true);

            let cases = this.game.plateau.casesDisponibles();

            cases[Math.floor(Math.random()*cases.length)].poserPion(premierPion);

            setTimeout(() => {
                const deuxiemePion = this.joueur.pions.find(p => p !== premierPion);
    
                cases = this.game.plateau.casesDisponibles();
    
                cases[Math.floor(Math.random()*cases.length)].poserPion(deuxiemePion);
    
                resolve();
            }, 500);
        });
    }
}