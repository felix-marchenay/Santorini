import { Plateau } from "./object/plateau";
import { Joueur } from "./joueur";
import { Color3, KeyboardEventTypes, PointerEventTypes } from "@babylonjs/core";
import { Pion } from "./object/pion";
import { Vector3 } from "babylonjs";
import { Stepper } from "./infrastructure/Stepper";
import { Preparation } from "./steps/Preparation";
import { ChoixNoms } from "./steps/ChoixNom";
import { AutoChoixNoms } from "./steps/AutoChoixNoms";
import { AutoPreparation } from "./steps/AutoPreparation";
import { Debug } from "./steps/Debug";
import { Deplacement } from "./steps/Deplacement";
import { Construction } from "./steps/Construction";
import { Interface } from "./ihm/Interface";
import { RandomBuild } from "./steps/RandomBuild";

export class Game
{
    constructor (scene, ihm) {
        this.plateau = new Plateau(scene);
        this.joueurs = [];
        this.stepper = new Stepper;

        this.couleursJoueur = [
            new Color3(0.3, 0.66, 0.35),
            new Color3(0.45, 0.32, 0.81),
            new Color3(0.65, 0.32, 0.81),
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
        this.ihm = new Interface;
        this.scene = scene;
    }

    idlePion() {
        const idling = this.pions.filter(pion => pion.idle);
        return idling.length > 0 ? idling[0] : null;
    }
    
    preparerPions() {
        this.pions = this.joueurs.reduce((pions, joueur) => {
            const pionsJoueur = [
                new Pion(this.scene, joueur.couleurPion, 'h'),
                new Pion(this.scene, joueur.couleurPion, 'f')
            ];
            joueur.pions = pionsJoueur;
            pions.push(...pionsJoueur);
            return pions;
        }, []);

        this.pions.forEach((pion, i) => {
            pion.mesh.position = new Vector3(-10, 1, (-5 + i*2.2));
        });
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
        this.stepper.addSteps(
            new AutoChoixNoms(this),
            new RandomBuild(this),
            new AutoPreparation(this),
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
            return 'win';
        });
    }
}