import { Step } from "./Step";

export class Preparation extends Step
{
    run () {
        return super.run(resolve => {

            this.game.ihm.tour('préparer ses pions');
            
            this.game.pionsPickables(this.game.pions, pion => {
                if (pion.case === null) {
                    this.game.toggleIdle(pion);
                }
            });

            this.game.casesPickables(caze => {
                if (this.game.idlePion() && this.game.idlePion().canGo(caze)) {
                    caze.poserPion(this.game.idlePion());
                    this.game.idlePion().stopIdle();
                }
    
                if (this.game.pions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });
        });
    }
}