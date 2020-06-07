import { Scene } from "babylonjs";
import { Joueur } from "./Joueur";
import { Plateau } from "./Plateau";
import { Stepper } from "../Infrastructure/Stepper";
import { EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { StepGroup } from "../Infrastructure/StepGroup";
import { Pion } from "./Pion";
import { IHMInterface } from "../IHMInterface";
import { Case } from "./Case";
import {Emitter, EmitterInterface } from "../Infrastructure/Emitter/Emitter";
import { ServerInterface } from "../ServerInterface";
// import { AutoPreparation } from "../Steps/AutoPreparation";

export class Jeu implements EmitterInterface
{
    public readonly plateau: Plateau;
    public stepper: Stepper = new Stepper;
    private idlePion: Pion | null = null;
    private skipListener: EmitterListener | null = null;
    private emitter = new Emitter;

    constructor(
        private scene: Scene,
        public readonly ihm: IHMInterface,
        public readonly joueurs: Array<Joueur>,
        public readonly server?: ServerInterface
    ) {
        this.plateau = new Plateau(this.scene);
        this.initSteps();
    }

    private initSteps(): void {
        this.stepper = new Stepper;

        this.joueurs.forEach(j => this.stepper.addSteps(j.getPreparationStep(this)));

        // this.stepper.addSteps(new AutoPreparation(this, this.joueurs[0]));

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

    set joueurActif (joueur: Joueur) {
        this.ihm.action('joueurActif', joueur);
    }

    findPionById (id: string): Pion {
        const pion = this.pions.find(p => p.id === id);

        if (pion === undefined) {
            throw "Pion " + id + " introuvable";
        }

        return pion;
    }

    findJoueurById(id: string): Joueur {
        const j = this.joueurs.find(p => p.id === id);

        if (j === undefined) {
            throw 'Joueur ' + id + ' introuvable';
        }

        return j;
    }

    adversaire (joueur: Joueur): Joueur {
        const adversaire = this.joueurs.find(j => j !== joueur);
        
        if (!adversaire) {
            throw "Pas d'aversaire pour le joueur " + joueur.name;
        }

        return adversaire;
    }

    tour (action: string) {
        this.ihm.action('tour', action);
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

    casesClickables(cases: Case[], fn: EmitterListener, lightGlow: boolean = true) {
        return cases.map(c => {
            c.enableClickable(lightGlow);
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
        this.server?.action(event, data);
    }

    poser (pion: Pion, caze: Case, joueur: Joueur) {
        const nonAutorise = this.joueurs.filter(j => j !== joueur).map(j => j.autoriseDeplacement(pion, caze)).filter(aut => !aut).length > 0;
        if (nonAutorise) {
            return;
        }
        joueur.posePion(pion, caze);
        this.sendServer('pionMove', pion.export());
    }

    displaySkip(resolve: Function) {
        this.ihm.action('showSkip');
        this.skipListener = this.ihm.on('skip', () => {
            this.endTurn(resolve);
        });
    }

    hideSkip() {
        this.ihm.action('hideSkip');
        if (this.skipListener) {
            this.ihm.off('skip', this.skipListener);
        }
    }

    construire(caze: Case) {
        caze.construire();
        this.sendServer('construire', caze.export());
    }

    construireDome(caze: Case) {
        caze.construireDome();
        this.sendServer('construireDome', caze.export());
    }

    construireSousLePion(caze: Case) {
        caze.construireSousLePion();
        this.sendServer('construireSousLePion', caze.export());
    }

    flushIhm() {
        this.ihm.flush();
    }

    flushServer () {
        this.server?.flush();
    }

    endTurn(resolve: Function) {
        this.pions.forEach(p => p.idling = false);
        this.sendServer('endTurn', null);
        resolve();
    }

    victory(joueur: Joueur) {
        this.flushEvents();

        this.ihm.action('victory', joueur);
        
        this.ihm.on('replay', () => {
            if (this.server) {
                this.server.emit('replay', null);
            }
            this.replay();
        });

        this.ihm.on('mainMenu', () => {
            this.emit('mainMenu', null);
        });

        if (this.server) {
            this.server.on('replay', () => {
                this.ihm.action('hideVictory');
                this.replay();
            });
        }

        setTimeout(() => {
            joueur.dernierPionDéplacé?.animateVictory();
        }, 600);
    }

    replay () {
        this.reinitialiser();
        this.stepper = new Stepper;
        this.initSteps();
        this.play();
    }

    reinitialiser() {
        this.pionsUnclickables(this.pions);
        this.casesUnpickables(this.plateau.allCases);
        this.plateau.vider();
        this.pions.forEach(p => {
            p.initPosition();
        });
    }

    async play(): Promise<void> {
        await this.stepper.run();
    }

    flushEvents() {
        this.pionsUnclickables(this.pions);
        this.casesUnpickables(this.plateau.allCases);
        this.hideSkip();
        this.flushServer();
        this.flushIhm();
    }
    
    on (event: string, f: EmitterListener): EventListener {
        return this.emitter.on(event, f);
    }

    off (event: string, f: EmitterListener): void {
        return this.emitter.off(event, f);
    }

    emit (event: string, ...vars: any[]) {
        this.emitter.emit(event, ...vars);
    }

    flush (): void {
        this.emitter.flush();
    }
}