import { Steppable } from "../Infrastructure/Steppable";
import { Jeu } from "../Model/Jeu";
import { Joueur } from "../Model/Joueur";
import { CommandBus } from "../Infrastructure/Command";

export abstract class Step  implements Steppable{
    
    protected commandBus = new CommandBus;
    constructor (
        protected jeu: Jeu,
        protected joueur: Joueur,
    ) {}

    abstract run (): Promise<void>;

    before (): void {
        this.jeu.joueurActif = this.joueur;
    }

    after (): void {
        this.jeu.flushEvents();
    }
}