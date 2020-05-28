import { Step } from "../../src/Steps/Step";

export class WaitStep extends Step {
    
    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {
            setTimeout(() => {
                resolve();
            }, 60);
        });
    }
}