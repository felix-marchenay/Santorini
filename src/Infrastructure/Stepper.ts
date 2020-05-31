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
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            step.before();
            await step.run();
            step.after();
        }
    }
}