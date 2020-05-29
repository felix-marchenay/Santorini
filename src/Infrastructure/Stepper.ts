import { Steppable } from "./Steppable";

export class Stepper
{
    constructor (
        private steps: Array<Steppable> = []
    ) {}

    addSteps(...steps: Array<Steppable>): void {
        this.steps.push(...steps);
    }

    async run (): Promise<void> {
        console.log(this.steps);
        for (let i = 0; i < this.steps.length; i++) {

            const step = this.steps[i];
            try {
                console.log(step);
                await step.run();
                step.after();
            } catch (e) {
                throw e;
            }
        }
    }
}