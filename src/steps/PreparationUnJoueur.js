import { Step } from "./Step";

export class PreparationUnSeulJoueur extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour('placer ses pions');
            
            this.game.pionsPickables(this.joueur.pions, pion => {

                this.game.casesUnpickables();
            
                this.game.casesPickables(caze => {
                    if (pion.canGo(caze)) {
                        caze.poserPion(pion);
    
                        this.game.sendServer('pionMove', pion.export());
                        pion.stopIdle();
                    }
    
                    if (this.joueur.pions.filter(p => p.case === null).length === 0) {
                        resolve();
                    }
                });
            });
        });
    }
}