import { Step } from "../../Step";

export class ErosPreparation extends Step
{
    run () {
        return super.run(resolve => {
            
            this.game.ihm.tour('placer ses pions');
            
            this.game.pionsPickables(this.joueur.pions, pion => {
                if (pion.case === null) {
                    this.game.toggleIdle(pion);
                    this.game.sendServer('idlePion', pion.export());
                }

                pion = this.game.idlePion();
                
                if (!pion) {
                    return;
                }

                const autrePion = this.joueur.pions.find(p => p != pion);

                this.game.casesUnpickables();

                if(autrePion.case !== null) {
                    this.game.casesPickables(
                        this.game.plateau.casesOpposeesA(autrePion.case),
                        caze => {
                            if (this.game.idlePion() && this.game.idlePion().canGo(caze)) {
                                caze.poserPion(this.game.idlePion());
        
                                this.game.sendServer('pionMove', this.game.idlePion().export());
                                this.game.idlePion().stopIdle();
                            }
        
                            if (this.joueur.pions.filter(p => p.case === null).length === 0) {
                                resolve();
                            }
                        }
                    );
                } else {
                    this.game.casesPickables(
                        this.game.plateau.casesDuPerimetre(),
                        caze => {
                            if (this.game.idlePion() && this.game.idlePion().canGo(caze)) {
                                caze.poserPion(this.game.idlePion());
        
                                this.game.sendServer('pionMove', this.game.idlePion().export());
                                this.game.idlePion().stopIdle();
                            }
        
                            if (this.joueur.pions.filter(p => p.case === null).length === 0) {
                                resolve();
                            }
                        }
                    );
                }

            });
        });
    }
}