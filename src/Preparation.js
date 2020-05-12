import { Interface } from "./ihm/Interface";
import { Game } from './Game';
import { Joueur } from "./joueur";
import { Pan } from "./divinite/Pan";
import { Atlas } from "./divinite/Atlas";
import { Demeter } from "./divinite/Demeter";
import { Poseidon } from "./divinite/Poseidon";
import { Athena } from "./divinite/Athena";
import { NoDivinite } from "./divinite/NoDivinite";
import { PreparationUnSeulJoueur } from "./steps/PreparationUnJoueur";

export class Preparation
{
    /**
     * @param {Interface} ihm  
     */
    constructor(ihm, server, scene) {
        this.ihm = ihm;
        this.server = server;
        this.id = null;
        this.scene = scene;
    }

    async launch() {
        const fn = (resolve) => {
            this.ihm.emitter.on('roomSearch', roomName => {
                this.server.connect(roomName);
            });
    
            this.server.emitter.on('entered', room => {
                console.log('room on preparation : ', room);
                this.id = room.you;
                this.ihm.enteredRoom(room);
            });
    
            this.ihm.emitter.on('ready', data => {
                this.server.emit('ready', data);
            });

            this.server.emitter.on('newPlayer', player => {
                this.ihm.newPlayer(player);
            });

            this.server.emitter.on('disconnection', player => {
                this.ihm.removePlayer(player);
            });

            this.server.emitter.on('letsgo', room => {

                const divinites = {
                    pan: new Pan,
                    atlas: new Atlas,
                    demeter: new Demeter,
                    poseidon: new Poseidon,
                    athena: new Athena,
                    no: new NoDivinite,
                };

                const joueurs = room.joueurs.map((p, i) => new Joueur(i+1, p.name, divinites[p.divinite], this.scene, p.id, (p.id !== this.id), p.pions));

                this.ihm.letsGo(joueurs);

                const game = new Game(this.scene, this.ihm, joueurs, this.server);

                game.stepper.addSteps([...joueurs.reduce(
                    (steps, joueur) => {
                        steps.push(
                            ...joueur.getPreparationStep(game),
                        );
                        return steps;
                    },
                    []
                )]);

                const steps = [...joueurs.reduce(
                    (steps, joueur) => {
                        steps.push(
                            ...joueur.getDeplacementStep(game), 
                            ...joueur.getConstructionStep(game),
                        );
                        return steps;
                    },
                    []
                )];

                game.stepper.addInfiniteSubsetSteps(...steps);

                resolve(game);
            });
        }
        return new Promise(fn);
    }
}