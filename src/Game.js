import { Plateau } from "./object/plateau";
import { Joueur } from "./joueur";
import { Color3, KeyboardEventTypes, PointerEventTypes, Color4, Scene } from "@babylonjs/core";
import { Pion } from "./object/pion";
import { Stepper } from "./infrastructure/Stepper";
import { Preparation } from "./steps/Preparation";
import { AutoPreparation } from "./steps/AutoPreparation";
import { RandomBuild } from "./steps/RandomBuild";
import { Unsplash } from "./steps/Unsplash";
import { Emitter } from "./infrastructure/Emitter";
import { Interface } from "./ihm/Interface";
import { Server } from "./Server";
import { Victoire } from "./Victoire";
import { SpotLight, Vector3, MeshBuilder } from "babylonjs";
import { Minotaur } from "./divinite/Minotaur";
import { Pan } from "./divinite/Pan";
import { Atlas } from "./divinite/Atlas";
import { Poseidon } from "./divinite/Poseidon";
import { NoDivinite } from "./divinite/NoDivinite";
import { Triton } from "./divinite/Triton";
import { Zeus } from "./divinite/Zeus";
import { Charon } from "./divinite/Charon";

export class Game
{
    /**
     * 
     * @param {Scene} scene 
     * @param {Interface} ihm 
     * @param {Server} server 
     */
    constructor (scene, ihm, joueurs, server) {
        this.emitter = new Emitter;
        this.plateau = new Plateau(scene);
        this.joueurs = joueurs;
        this.scene = scene;
        this.ihm = ihm;
        this.stepper = new Stepper;
        this.server = server;
        this.setStepsFromPlayers();
    }

    get pions () {
        return this.joueurs.reduce((pions, joueur) => {
            pions.push(...joueur.pions);
            return pions;
        }, []);
    }

    sendServer(event, data) {
        if (this.server) {
            console.log('emitting: ', event, data);
            this.server.emit(event, data);
        }
    }

    sendVictory(joueur) {
        this.sendServer('victory', {
            joueur: joueur.export(),
            pion: this.idlePion().export()
        });
    }

    setStepsFromPlayers() {

        // this.joueurs.forEach(j => this.stepper.addSteps(...j.getPreparationStep(this)));

        this.stepper.addSteps(new AutoPreparation(this));

        const steps = [...this.joueurs.reduce(
            (steps, joueur) => {
                steps.push(
                    ...joueur.getDeplacementStep(this), 
                    ...joueur.getConstructionStep(this),
                );
                return steps;
            },
            []
        )];

        this.stepper.addInfiniteSubsetSteps(...steps);
    }

    endTurn() {
        this.pions.forEach(p => p.stopIdle());
        this.sendEndTurn();
    }

    sendEndTurn() {
        this.sendServer('endTurn');
    }

    toggleIdle(pion) {
        this.pions.filter(p => p!= pion).forEach(p => p.stopIdle());
        pion.toggleIdle();
    }

    idlePion() {
        const idling = this.pions.filter(pion => pion.idle);
        return idling.length > 0 ? idling[0] : null;
    }

    activePlayer() {
        return this.joueurs[0];
    }

    setPlayers(active, ...players) {
        this.joueurs = [active, ...players];
    }

    onClickCaseAvoisinantes(pion, fn) {
        this.game.casesPickables(this.plateau.casesAvoisinantes(pion.case), fn);
    }

    flushEventsCases() {
        this.plateau.allCases().forEach(cas => cas.emitter.flush());
    }

    hideAllBuildHint() {
        this.plateau.allCases().forEach(cas => cas.hideBuildHint());
    }

    findPionById(id) {
        let pionFound = null;
        this.joueurs.forEach(j => {
            const pion = j.pions.find(p => p.id == id);
            if (pion) {
                pionFound = pion;
            }
        });
        
        return pionFound;
    }

    pionsPickables(pions, fn) {
        return pions.map(p => {
            p.enableClickable();
            return p.emitter.on('picked', fn);
        });
    }

    pionsUnpickables(pions) {
        pions.forEach(p => {
            p.disableClickable();
            p.emitter.flush();
        });
    }

    casesPickables(cases, fn) {
        if (typeof cases === 'function') {
            fn = cases;
            cases = this.plateau.allCases();
        }
        return cases.map(c => {
            c.enableClickable();
            return c.emitter.on('pointerPicked', fn);
        });
    }

    casesUnpickables(cases) {
        if (cases === undefined) {
            cases = this.plateau.allCases();
        }
        cases.forEach(c => {
            c.disableClickable();
            c.emitter.flush();
        });
    }

    findJoueurById(id) {
        return this.joueurs.find(j => j.id == id);
    }

    joueursAdverses(joueur) {
        return this.joueurs.filter(j => j.id != joueur.id);
    }

    findCaseByCoordinates(coordinates) {
        return this.plateau.cases[coordinates.x][coordinates.y];
    }

    victory(joueur) {
        this.ihm.victory(joueur);
        setTimeout(() => {
            joueur.lastMovedPion.animateVictory();
        }, 1100);
    }

    async play() {
        this.stepper.run().catch(e => {
            if (e instanceof Victoire) {
                console.log(e, e.joueur.lastMovedPion);
                this.victory(e.joueur);
            } else {
                console.error(e);
            }
        });
    }

    displaySkip(resolve) {
        this.ihm.showSkip();
        this.skipEvent = this.ihm.emitter.on('skip', () => {
            this.endTurn();
            resolve();
        });
    }

    hideSkip() {
        this.ihm.hideSkip();
        this.ihm.emitter.off(this.skipEvent);
    }

    replay () {
        this.ihm.hideAll();

        this.plateau.vider();
        
        this.pions.forEach(pion => pion.mesh.dispose());

        this.joueurs = [];

        this.play();
    }

    static allDivinites() {
        return Object.keys(Game.divinitesStringMapping());
    }

    static divinitesStringMapping() {
        return {
            pan: new Pan,
            atlas: new Atlas,
            // demeter: new Demeter,
            poseidon: new Poseidon,
            // athena: new Athena,
            no: new NoDivinite,
            triton: new Triton,
            zeus: new Zeus,
            minotaur: new Minotaur,
            charon: new Charon  
        };
    }

    static diviniteFromString(string) {
        return Game.divinitesStringMapping()[string];
    }
}