import { Step } from "../../Step";
import { Victoire } from "../../../Victoire";

export class ApollonDeplacement extends Step
{
    run () {
        return super.run((resolve, reject) => {

            this.game.ihm.tour('se déplacer ou échanger sa place');

            this.game.pionsPickables(this.joueur.pions, pion => {                
                this.game.casesPickables(
                    this.game.plateau.casesAvoisinantes(pion.case).filter(caze => pion.apollonCanGo(caze)),
                    caze => {
                        try {
                            if (caze.pion !== null) {
                                const pionTarget = caze.pion;
                                pionTarget.switchWith(pion);
                                this.game.sendServer('pionSwitch', [pion.export(), pionTarget.export()]);
                            } else {
                                caze.poserPion(pion);
                                this.game.sendServer('pionMove', pion.export());
                            }

                            this.joueur.lastMovedPion = pion;
                            
                            if (this.joueur.isVictorious()) {
                                this.game.sendVictory(this.joueur);
                                reject(new Victoire(this.joueur));
                            }
                            
                            this.game.endTurn();
                            resolve();
                        } catch (e) {
                            console.log(e);
                            this.game.ihm.error(e);
                        }
                    }
                );
            });
        });
    }
}