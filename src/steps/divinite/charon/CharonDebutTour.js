import { Step } from "../../Step";

export class CharonDebutTour extends Step
{    
    run () {
        return super.run(resolve => {

            this.game.ihm.tour('déplacer un pion adverse');

            this.game.displaySkip(resolve);

            this.game.joueursAdverses(this.joueur).forEach(adversaire => {
                
                const pionsProcheAdversaires = adversaire.pions.filter(p => {
                    const cases = this.game.plateau.casesDistanceDe(p.case, 2).filter(c => {
                        const caseEntre = this.game.plateau.caseEntre(c, p.case);
                        if (caseEntre && caseEntre.pion && this.joueur.hasPion(caseEntre.pion)) {
                            return true;
                        }
                    });
                    return cases.length > 0;
                });
                
                if (pionsProcheAdversaires.length < 1) {
                    this.game.endTurn();
                    resolve();
                }
                
                this.game.pionsPickables(pionsProcheAdversaires, pion => {
                    pion.toggleIdle();

                    pion = this.game.idlePion();

                    if (!pion) {
                        return;
                    }

                    const cases = this.game.plateau.casesDistanceDe(pion.case, 2).filter(c => {
                        const caseEntre = this.game.plateau.caseEntre(c, pion.case);
                        if (caseEntre && caseEntre.pion && this.joueur.hasPion(caseEntre.pion)) {
                            return true;
                        }
                    });

                    this.game.casesPickables(
                        cases,
                        caze => {
                            try {
                                const caseEntre = this.game.plateau.caseEntre(pion.case, caze);
                                if (caseEntre && caseEntre.pion && this.joueur.hasPion(caseEntre.pion)) {

                                        if (caze.pion !== null) {
                                            throw "Case occupée";
                                        }

                                        caze.poserPionForce(pion);
                                        this.game.sendServer('pionMoveForce', pion.export());
                                        
                                        this.game.endTurn();
                                        resolve();
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    );

                });
            });
        });
    }
}