import { Step } from "../../Step";

export class CharonDebutTour extends Step
{    
    run () {
        return super.run(resolve => {

            this.game.ihm.tour('déplacer un pion adverse');

            this.game.displaySkip(resolve);

            this.game.joueursAdverses(this.joueur).forEach(adversaire => {
                
                const pionsProcheAdversaires = adversaire.pions.filter(p => {
                    for (const caseProche of this.game.plateau.casesAvoisinantes(p.case)) {
                        if (caseProche.pion && this.joueur.hasPion(caseProche.pion)) {
                            return true;
                        }
                    }
                    return false;
                });

                console.log(pionsProcheAdversaires);

                if (pionsProcheAdversaires.length < 1) {
                    resolve();
                }
                
                pionsProcheAdversaires.forEach(p => {
                    p.emitter.on('picked', pion => {
                        this.game.pions.filter(p => p != pion).forEach(p => {
                            p.stopIdle();
                        });
                        pion.toggleIdle();
                    });
                });
            });

            this.game.plateau.allCases().forEach(caze => {
                caze.emitter.on('pointerPicked', () => {
                    if (this.game.idlePion()) {
                        
                        const pion = this.game.idlePion();
                        try {
                            const caseEntre = this.game.plateau.caseEntre(pion.case, caze);
                            if (caseEntre && caseEntre.pion && this.joueur.hasPion(caseEntre.pion)) {
                                    caze.poserPionForce(pion);
                                    this.game.sendServer('pionMoveForce', pion.export());
                                    
                                    this.game.endTurn();
                                    resolve();
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
            });
        });
    }

    after() {
    }
}