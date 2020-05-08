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

export class Game
{
    constructor (scene, nbJoueurs) {
        this.plateau = new Plateau(scene);
        this.joueurs = [];
        this.stepper = new Stepper;

        this.couleursJoueur = [
            scene.container.materials.find(mat => mat.id == 'pion-vert'),
            scene.container.materials.find(mat => mat.id == 'pion-bleu'),
            scene.container.materials.find(mat => mat.id == 'pion-blanc'),
        ];
        
        scene.onPointerObservable.add(pointerInfo => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERPICK:
                    if (pointerInfo.pickInfo.pickedMesh) {

                        /////
                        // console.log(pointerInfo.pickInfo.pickedMesh, pointerInfo.pickInfo.pickedMesh.getBoundingInfo());
                        // pointerInfo.pickInfo.pickedMesh.showBoundingBox = true;
                        // MeshBuilder.CreateLines("axisX", {
                        //     points: [
                        //         new Vector3(0, 0, 0), 
                        //         pointerInfo.pickInfo.pickedMesh.getBoundingInfo().boundingBox.center
                        //     ],
                        //     colors: [
                        //         new Color4(0.9, 0.2, 0.2), 
                        //         new Color4(0.9, 0.2, 0.2)
                        //     ]
                        // }, scene);
                        // MeshBuilder.CreateLines("axisX", {
                        //     points: [
                        //         new Vector3(0, 0, 0), 
                        //         pointerInfo.pickInfo.pickedMesh.getBoundingInfo().boundingBox.maximumWorld
                        //     ],
                        //     colors: [
                        //         new Color4(0.2, 0.9, 0.2), 
                        //         new Color4(0.2, 0.9, 0.2)
                        //     ]
                        // }, scene);

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
        
        this.ihm = new Interface();
        this.scene = scene;
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
        
        this.setPlayers(
            new Joueur(1, 'Albert', this.couleursJoueur[0], new Atlas, this.scene),
            new Joueur(2, 'Bertinho', this.couleursJoueur[1], new Poseidon, this.scene),
        );
        this.stepper.addSteps(
            // new ChoixNoms(this),
            new RandomBuild(this),
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
}