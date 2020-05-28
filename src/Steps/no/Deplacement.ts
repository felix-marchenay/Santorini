import { Step } from "../Step";

export class Deplacement extends Step {
    
    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
}