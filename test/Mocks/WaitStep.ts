import { FakeStep } from "./FakeStep";

export class WaitStep extends FakeStep {
    
    async run (): Promise<void> {
        return new Promise<void>((resolve: Function) => {
            setTimeout(() => {
                resolve();
            }, 60);
        });
    }
}