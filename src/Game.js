import { Plateau } from "./object/plateau";
import { Joueur } from "./joueur";
import { Color3, KeyboardEventTypes, PointerEventTypes, Color4 } from "@babylonjs/core";
import { Pion } from "./object/pion";
import { Vector3, MeshBuilder } from "babylonjs";
import { Stepper } from "./infrastructure/Stepper";
import { Preparation } from "./steps/Preparation";
import { ChoixNoms } from "./steps/ChoixNom";
import { AutoChoixNoms } from "./steps/AutoChoixNoms";
import { AutoPreparation } from "./steps/AutoPreparation";
import { Deplacement } from "./steps/Deplacement";
import { Construction } from "./steps/Construction";
import { Interface } from "./ihm/Interface";
import { RandomBuild } from "./steps/RandomBuild";
import { Victoire } from "./Victoire";
import { Poseidon } from "./divinite/Poseidon";
import { Atlas } from "./divinite/Atlas";
import { Unsplash } from "./steps/Unsplash";
import { Emitter } from "./infrastructure/emitter";

export class Game
{
    constructor (scene, nbJoueurs) {
        this.emitter = new Emitter;
        this.plateau = new Plateau(scene);
        this.joueurs = [];
        this.scene = scene;
        
        this.ihm = new Interface();
        this.ihm.emitter.on('replay', () => {
            this.emitter.emit('replay');
        });

        this.couleursJoueur = [
            scene.container.materials.find(mat => mat.id == 'pion-vert'),
            scene.container.materials.find(mat => mat.id == 'pion-bleu'),
            scene.container.materials.find(mat => mat.id == 'pion-blanc'),
        ];
        
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

    idlePion() {
        const idling = this.pions.filter(pion => pion.idle);
        return idling.length > 0 ? idling[0] : null;
    }

    nextPlayerActive() {
        const inactives = this.joueurs.filter(player => player != this.activePlayer());
        this.joueurs = [...inactives, this.activePlayer()];
    }

    activePlayer() {
        return this.joueurs[0];
    }

    inactivePlayer() {
        return this.joueurs.filter();
    }

    setPlayers(active, ...players) {
        this.joueurs = [active, ...players];
    }

    async play() {
        this.stepper = new Stepper();
        
        this.stepper.addSteps(
            new Unsplash(this),
            new AutoChoixNoms(this),
            new AutoPreparation(this)
        );

        await this.stepper.run();

        const playSteps = [...this.joueurs.reduce(
            (steps, joueur) => {
                steps.push(
                    joueur.getDeplacementStep(this), 
                    joueur.getConstructionStep(this),
                );
                return steps;
            },
            []
        )];

        this.stepper = new Stepper();
        this.stepper.addInfiniteSubsetSteps(...playSteps);
        this.stepper.run().catch(e => {
            this.ihm.victory(e);
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