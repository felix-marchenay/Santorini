import { Step } from "./Step";

export class RandomBuild extends Step
{
    run () {
        return super.run(resolve => {
            for(var i = 0; i < 25; i++) {
                try {
                    this.game.plateau.cases[Math.floor(Math.random()*5)][Math.floor(Math.random()*5)].build();
                } catch (e) {
                    // console.log(e);
                }
            }

            resolve();
        });
    }
}