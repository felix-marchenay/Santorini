import { Interface } from "./ihm/Interface";
import { Game } from './Game';
import { Joueur } from "./joueur";
import { Pan } from "./divinite/Pan";
import { Atlas } from "./divinite/Atlas";
import { Demeter } from "./divinite/Demeter";
import { Poseidon } from "./divinite/Poseidon";
import { Athena } from "./divinite/Athena";
import { NoDivinite } from "./divinite/NoDivinite";

export class Preparation
{
    /**
     * @param {Interface} ihm  
     */
    constructor(ihm, server, scene) {
        this.ihm = ihm;
        this.server = server;
        this.joueurs = [];
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
                this.server.registerPlayer(data);
            });

            this.server.emitter.on('newPlayer', player => {
                this.ihm.newPlayer(player);
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

                console.log('letsgooo', room);

                const joueurs = room.joueurs.map((p, i) => new Joueur(i+1, p.name, divinites[p.divinite], this.scene, (p.id !== this.id)));

                this.ihm.letsGo(joueurs.map(j => ({
                    name: j.name,
                    divinite: j.divinite.name
                })));

                resolve(new Game(this.scene, this.ihm, joueurs));
            });
        }
        return new Promise(fn);
    }
}