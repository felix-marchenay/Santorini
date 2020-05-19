import { Step } from "../Step";

export class IAConstruction extends Step
{
    run () {
        return super.run((resolve, reject) => {

            setTimeout(() => {
                const pion = this.joueur.lastMovedPion;
    
                const cases = this.game.plateau.casesAvoisinantesBuildables(pion.case);
    
                cases[Math.floor(Math.random() * cases.length)].build();

                resolve();
            }, 250);
        });
    }
}