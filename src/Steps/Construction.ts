import { Step } from "./Step";

export class Construction extends Step
{
    run (): Promise<void> {
        return new Promise<void>(resolve => {
            
            
            resolve();
        });
    }
}