import { Step } from "./Step";

export class PreparationUnSeulJoueur extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour('placer ses pions');
            
            this.game.pionsPickables(this.joueur.pions, pion => {
                if (pion.case === null) {
                    this.game.toggleIdle(pion);
                    this.game.sendServer('idlePion', pion.export());
                }
            });
            
            this.game.casesPickables(caze => {
                console.log(caze);
                if (this.game.idlePion() && this.game.idlePion().canGo(caze)) {
                    caze.poserPion(this.game.idlePion());

                    this.game.sendServer('pionMove', this.game.idlePion().export());
                    this.game.idlePion().stopIdle();
                }

                if (this.joueur.pions.filter(p => p.case === null).length === 0) {
                    resolve();
                }
            });
        });
    }
}