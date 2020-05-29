import { Step } from "./Step";

export class Preparation extends Step
{
    run (): Promise<void>  {
        return new Promise<void>(resolve => {
            resolve();
        });
    }
}