import { Step } from "../Step";
import { Case } from "../../Model/Case";

export class ConstructionAtlas extends Step
{
    private buildMode = 'etage';

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

            const cases = this.jeu.plateau.casesAvoisinantes(pion.case).filter(c => c.constructible);

            if (this.buildMode === 'etage') {
                cases.forEach(c => c.showBuildHint());
            } else {
                cases.forEach(c => c.showBuildHintDome());
            }

            this.jeu.ihm.action('setAtlasMode', this.buildMode);

            this.jeu.ihm.on('switchAtlasMode', (mode: string) => {
                this.buildMode = mode;

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
                    if (this.buildMode === 'etage') {
                        this.jeu.construire(caze);
                    } else {
                        this.jeu.construireDome(caze);
                    }

                    this.jeu.endTurn(resolve);
                }
            );
        });
    }
}