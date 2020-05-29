import { Steppable } from "../../src/Infrastructure/Steppable";

export class ErrorAfterN implements Steppable
{
    private runs: number = 0;

    run (): Promise<void> {
        return new Promise<void>((resolve: Function, reject: Function) => {
            if (this.runs < 2) {
                this.runs++;

                resolve();
            } else {
                reject('rejected');
            }
        });
    }

    after () {}
}