import { Steppable } from "../../src/Infrastructure/Steppable";

export class FakeStep implements Steppable
{
    constructor (public object: {count: number}) {}

    run (): Promise<void> {
        return new Promise<void>(resolve => {
            this.object.count++;
            resolve();
        });
    }

    before (): void {}
    
    after (): void {}
}