import { Step } from "./Step";

export class ConstructionDistant extends Step
{
    before () {
        super.before();
        this.jeu.tour('construire un étage');
    }

    run (): Promise<void> {
        return new Promise<void>(resolve => {
            resolve;
        });
    }
}