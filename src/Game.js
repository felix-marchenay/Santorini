import { Plateau } from "./object/plateau";
import { Joueur } from "./joueur";
import { Color3, KeyboardEventTypes, PointerEventTypes, Color4, Scene } from "@babylonjs/core";
import { Pion } from "./object/pion";
import { Stepper } from "./infrastructure/Stepper";
import { Preparation } from "./steps/Preparation";
import { ChoixNoms } from "./steps/ChoixNom";
import { AutoChoixNoms } from "./steps/AutoChoixNoms";
import { AutoPreparation } from "./steps/AutoPreparation";
import { RandomBuild } from "./steps/RandomBuild";
import { Unsplash } from "./steps/Unsplash";
import { Emitter } from "./infrastructure/Emitter";
import { Interface } from "./ihm/Interface";
import { AutoDistant } from "./steps/AutoDistant";
import { Server } from "./Server";
import { Victoire } from "./Victoire";
import { SpotLight, Vector3, MeshBuilder } from "babylonjs";

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
        console.log(2);
        this.plateau = new Plateau(scene);
        this.joueurs = joueurs;
        this.scene = scene;
        console.log(25);
        this.ihm = ihm;
        this.stepper = new Stepper;
        this.server = server;
        this.setStepsFromPlayers();
        console.log(26);
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


        //////////
        this.stepper.addSteps(
            new RandomBuild(this, this.joueurs),
            new AutoPreparation(this, this.joueurs),
        );


        // this.joueurs.forEach(j => this.stepper.addSteps(...j.getPreparationStep(this)));

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

    sendEndTurn() {
        this.sendServer('endTurn');
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
        this.plateau.casesAvoisinantes(pion.case).forEach(cas => {
            cas.emitter.on('pointerPicked', () => { fn(cas) });
        });
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

    findJoueurById(id) {
        return this.joueurs.find(j => j.id == id);
    }

    findCaseByCoordinates(coordinates) {
        return this.plateau.cases[coordinates.x][coordinates.y];
    }

    async play() {
        this.stepper.run().catch(e => {
            if (e instanceof Victoire) {
                console.log(e);
                this.ihm.victory(e.joueur);
            } else {
                console.error(e);
            }
        });
    }

    replay () {
        this.ihm.hideAll();

        this.plateau.vider();
        
        this.pions.forEach(pion => pion.mesh.dispose());

        this.joueurs = [];

        this.play();
    }
}