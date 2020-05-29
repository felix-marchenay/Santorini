import { Scene } from "babylonjs";
import { Server } from "../Server";
import { Joueur } from "./Joueur";
import { Plateau } from "./Plateau";
import { Stepper } from "../Infrastructure/Stepper";
import { EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { StepGroup } from "../Infrastructure/StepGroup";
import { Pion } from "./Pion";
import { IHMInterface } from "../IHMInterface";
import { Case } from "./Case";

export class Jeu
{
    public plateau: Plateau;
    public stepper: Stepper = new Stepper;
    private idlePion: Pion | null = null;
    private skipListener: EmitterListener | null = null;

    constructor(
        private scene: Scene,
        private ihm: IHMInterface,
        private joueurs: Array<Joueur>,
        private server?: Server     
    ) {
        this.plateau = new Plateau(this.scene);
        this.initSteps();
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

    get pions (): Array<Pion> {
        return this.joueurs.reduce((pions: Array<Pion>, joueur: Joueur) => {
            pions.push(...joueur.allPions);
            return pions;
        }, []);
    }

    get pionIdle (): Pion | null {
        return this.idlePion;
    }

    set pionIdle (pion: Pion | null) {
        this.pions.forEach(p => p.idling = false);
        if (pion === null) {
            return;
        }
        pion.idling = true;
        this.idlePion = pion;
    }

    pionsClickables(pions: Array<Pion>, fn: (p: Pion) => void) {
        return pions.map(p => {
            p.enableClickable();
            return p.on('click', () => {
                this.pionIdle = p;

                // this.sendServer('idlePion', pion.export());

                fn(p);
            });
        });
    }

    pionsUnclickables (pions: Pion[]) {
        pions.forEach(p => {
            p.disableClickable();
            p.flush();
        });
    }

    casesClickables(cases: Case[], fn: EmitterListener) {
        return cases.map(c => {
            c.enableClickable();
            return c.on('click', fn);
        });
    }

    casesUnpickables(cases: Case[]) {
        cases.forEach(c => {
            c.disableClickable();
            c.flush();
        });
    }

    sendServer(event: string, data: any): void {
        if (this.server) {
            this.server.emit(event, data);
        }
    }

    displaySkip(resolve: Function) {
        this.ihm.action('showSkip');
        this.skipListener = this.ihm.on('skip', () => {
            this.endTurn();
            resolve();
        });
    }

    hideSkip() {
        this.ihm.action('hideSkip');
        if (this.skipListener) {
            this.ihm.off('skip', this.skipListener);
        }
    }

    flushIhm() {
        this.ihm.flush();
    }

    flushServer () {
        this.server?.flush();
    }

    endTurn() {
        this.pions.forEach(p => p.idling = false);
        this.sendServer('endTurn', null);
    }

    async play(): Promise<void> {
        this.stepper.run();
    }
}