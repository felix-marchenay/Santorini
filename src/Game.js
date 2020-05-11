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
        
        this.ihm.emitter.on('replay', () => {
            this.emitter.emit('replay');
        });
        
        scene.onPointerObservable.add(pointerInfo => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERPICK:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerPicked === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerPicked(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERDOWN:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerDown === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerDown(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERUP:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerUp === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerUp(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERMOVE:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerMove === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerMove(pointerInfo.pickInfo);
                        }
                    }
                    break;
            }
        });

        scene.onKeyboardObservable.add(keyInfo => {
            switch (keyInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    this.emitter.emit('keyDown', keyInfo.event);
                    this.emitter.emit('keyDown-'+keyInfo.event.code);
                    break;
                case BABYLON.KeyboardEventTypes.KEYUP:
                    this.emitter.emit('keyUp', keyInfo.event);
                    this.emitter.emit('keyUp-'+keyInfo.event.code);
                    break;
            }
        });
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
            console.error(e);
            // this.ihm.victory(e);
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