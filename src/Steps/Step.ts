import { Steppable } from "../Infrastructure/Steppable";
import { Jeu } from "../Model/Jeu";
import { Joueur } from "../Model/Joueur";

export abstract class Step  implements Steppable{

    constructor (
        protected jeu: Jeu,
        protected joueur: Joueur
    ) {}

    abstract run (): Promise<void>;

    after (): void {

    }
}