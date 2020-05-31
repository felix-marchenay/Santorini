import { Steppable } from "./Steppable";

export class StepGroup implements Steppable{
    
    constructor (
        private steps: Array<Steppable>,
        private readonly infinite: boolean
    ) {}

    public async run (): Promise<void> {
        if (this.infinite) {
            while (1) {
                await this.cycle();
            }
        } else {
            await this.cycle();
        }
    }
    
    private async cycle (): Promise<void> {
        for (let i = 0; i < this.steps.length; i++) {
            console.log(this.steps[i]);
            this.steps[i].before();
            await this.steps[i].run();
            this.steps[i].after();
        }
    }

    public before (): void {}

    public after (): void {}

    public add (...steps: Array<Steppable>): void {
        this.steps.push(...steps);
    }
}