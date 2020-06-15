import { Step } from "../Step";
import { Case } from "../../Model/Case";

export class ConstructionZeus extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {

            const pion = this.joueur.dernierPionDéplacé;

            if (!pion?.case) {
                return;
            }

            const cases = this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => !c.estOccupée && !c.estComplete);
            
            if (pion.case.niveau < 3) {
                cases.push(pion.case);
            }

            cases.forEach(c => c.showBuildHint());
            
            this.jeu.casesClickables(
                cases,
                (caze: Case) => {
                    this.jeu.construireSousLePion(caze);

                    this.jeu.endTurn(resolve);
                }
            );
        });
    }
}