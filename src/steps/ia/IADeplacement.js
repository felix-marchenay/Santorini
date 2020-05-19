import { Step } from "../Step";
import { Victoire } from "../../Victoire";

export class IADeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            setTimeout(() => {

                let pionHighestCase = this.joueur.pions.reduce((carry, p) => {
                    const hCase = this.game.plateau.highestCaseCanGo(p);
                    if (hCase === null) {
                        return carry;
                    }
                    if (carry.case === null || hCase.niveau() > carry.case.niveau()) {
                        carry.pion = p;
                        carry.case = hCase;
                    }

                    return carry;
                }, {pion: null, case: null});

                pionHighestCase.case.poserPion(pionHighestCase.pion);
                
                this.joueur.lastMovedPion = pionHighestCase.pion;

                if (this.joueur.isVictorious()) {
                    this.game.sendVictory(this.joueur);
                    reject(new Victoire(this.joueur));
                }

                resolve();

            }, 150)

        });
    }
}