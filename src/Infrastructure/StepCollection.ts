import { Step } from "../Steps/Step";
import { Steppable } from "./Steppable";

export class StepGroupe implements Steppable{
    
    constructor (
        private steps: Array<Step>,
        private readonly infinite: boolean
    ) {
        
    }

    public async run (): Promise<void> {
        return new Promise<void>(async resolve => {
            if (this.infinite) {
                while (1) {
                    await this.cycle();
                }
            } else {
                await this.cycle();
            }

            resolve();
        });
    }
    
    private async cycle (): Promise<void> {
        return new Promise<void>(async resolve => {
            for (let i = 0; i < this.steps.length; i++) {
                await this.steps[i].run();
                this.steps[i].after();
                resolve();
            }
        });
    }
}