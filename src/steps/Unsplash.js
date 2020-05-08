import { Step } from "./Step";

export class Unsplash extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.unsplash();
            resolve();
        });
    }
}