import { Steppable } from "../Infrastructure/Steppable";
// import { Jeu } from "../Model/Jeu";

export abstract class Step  implements Steppable{

    abstract run (): Promise<void>;

    after (): void {

    }
}