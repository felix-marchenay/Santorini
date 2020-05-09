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

export class Game
{
    /**
     * 
     * @param {Scene} scene 
     * @param {number} nbJoueurs 
     * @param {Interface} ihm 
     */
    constructor (scene, nbJoueurs, ihm) {
        this.emitter = new Emitter;
        this.plateau = new Plateau(scene);
        this.joueurs = [];
        this.scene = scene;
        this.ihm = ihm;
        
        this.ihm.emitter.on('replay', () => {
            this.emitter.emit('replay');
        });

        this.couleursJoueur = [
            scene.container.materials.find(mat => mat.id == 'pion-blanc'),
            scene.container.materials.find(mat => mat.id == 'pion-bleu'),
            scene.container.materials.find(mat => mat.id == 'pion-vert'),
        ];
        this.couleursHex = [
            'e6e6e6',
            '1543e6',
            '11d934'
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
                    ...joueur.getDeplacementStep(this), 
                    ...joueur.getConstructionStep(this),
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