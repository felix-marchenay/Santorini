import { Step } from "../Step";
import { Victoire } from "../../Victoire";

export class IADeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            setTimeout(() => {

                const pion = this.joueur.pions.find(p => {
                    return this.game.plateau.casesAvoisinantes(p.case).filter(c => p.canGo(c)).length > 0;
                });

                const cases = this.game.plateau.casesAvoisinantes(pion.case).filter(c => pion.canGo(c));

                cases[Math.floor(Math.random() * cases.length)].poserPion(pion);
                
                this.joueur.lastMovedPion = pion;

                resolve();

            }, Math.random()*300+150)

        });
    }
}