import { Step } from "./Step";

export class Debug extends Step
{
    run () {
        return super.run(resolve => {

            console.log('debugging');

            resolve();
        });
    }
}