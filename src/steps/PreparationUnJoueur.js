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

                this.game.casesUnpickables();

                pion = this.game.idlePion();
                
                if (!pion) {
                    return;
                }
            
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