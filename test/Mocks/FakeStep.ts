import { Steppable } from "../../src/Infrastructure/Steppable";

export class FakeStep implements Steppable
{
    run (): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    after (): void {}
}