import { Scene } from "babylonjs";
import { Server } from "./Server";
import { Joueur } from "./Joueur";
import { Plateau } from "./Plateau";
import { Stepper } from "./Infrastructure/Stepper";
import { EmitterInterface } from "./Infrastructure/Emitter/Emitter";

export class Jeu
{
    public plateau: Plateau;
    public stepper: Stepper = new Stepper;

    constructor(
        private scene: Scene,
        private ihm: EmitterInterface,
        private joueurs: Joueur[],
        private server?: Server
    ) {
        this.plateau = new Plateau(this.scene);
    }

    sendServer(event: string, data: any): void {
        if (this.server) {
            this.server.emit(event, data);
        }
    }

    start(): void {
        this.ihm;
        this.joueurs;
    }
}