import { Step } from "../Step";

export class DistantStep extends Step
{
    run () {
        return super.run(resolve => {

        });
    }

    after () {
        this.game.server.emitter.flush();
    }
}