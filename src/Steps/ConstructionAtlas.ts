import { Step } from "./Step";
import { Case } from "../Model/Case";

export class ConstructionAtlas extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage ou un dôme');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {

            const pion = this.joueur.dernierPionDéplacé;

            if (!pion?.case) {
                return;
            }

            const cases = this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => !c.estOccupée && !c.estComplete);

            cases.forEach(c => c.showBuildHint());

            this.jeu.ihm.on('switchAtlasMode', (mode: string) => {
                
                cases.forEach(c => c.hideBuildHint());

                if (mode === 'etage') {
                    cases.forEach(c => c.showBuildHint());
                } else if (mode === 'dome') {
                    cases.forEach(c => c.showBuildHintDome());
                }
            });
            
            this.jeu.casesClickables(
                cases,
                (caze: Case) => {
                    this.jeu.construire(caze);

                    this.jeu.endTurn(resolve);
                }
            );
        });
    }
}