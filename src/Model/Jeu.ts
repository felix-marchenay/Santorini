import { Scene } from "babylonjs";
import { Server } from "../Server";
import { Joueur } from "./Joueur";
import { Plateau } from "./Plateau";
import { Stepper } from "../Infrastructure/Stepper";
import { EmitterInterface } from "../Infrastructure/Emitter/Emitter";
import { StepGroup } from "../Infrastructure/StepGroup";
import { Pion } from "./Pion";

export class Jeu
{
    public plateau: Plateau;
    public stepper: Stepper = new Stepper;

    constructor(
        private scene: Scene,
        private ihm: EmitterInterface,
        private joueurs: Array<Joueur>,
        private server?: Server
    ) {
        this.plateau = new Plateau(this.scene);
        this.initSteps();
    }

    get pions (): Array<Pion> {
        return this.joueurs.reduce((pions: Array<Pion>, joueur: Joueur) => {
            pions.push(...joueur.allPions);
            return pions;
        }, []);
    }

    private initSteps(): void {
        this.joueurs.forEach(j => this.stepper.addSteps(j.getPreparationStep(this)));

        const steps: StepGroup = this.joueurs.reduce(
            (steps: StepGroup, joueur: Joueur) => {
                steps.add(
                    joueur.getDeplacementStep(this), 
                    joueur.getConstructionStep(this),
                );
                return steps;
            },
            new StepGroup([], true)
        );

        this.stepper.addSteps(steps);
    }

    sendServer(event: string, data: any): void {
        if (this.server) {
            this.server.emit(event, data);
        }
    }

    start(): void {
        this.ihm;
        this.joueurs;
        console.log(this.plateau);
    }
}