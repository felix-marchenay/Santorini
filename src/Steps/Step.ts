import { Steppable } from "../Infrastructure/Steppable";

export abstract class Step  implements Steppable{

    abstract run (): Promise<void>;

    after (): void {

    }
}