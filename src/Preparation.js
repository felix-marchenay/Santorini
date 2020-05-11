import { Interface } from "./ihm/Interface";
import { Game } from './Game';

export class Preparation
{
    /**
     * @param {Interface} ihm  
     */
    constructor(ihm, server) {
        this.ihm = ihm;
        this.server = server;
        this.joueurs = [];
    }

    async launch() {
        const fn = (resolve) => {
            this.ihm.emitter.on('roomSearch', roomName => {
                this.server.connect(roomName);
            });
    
            this.server.emitter.on('entered', room => {
                console.log('room on preparation : ', room);
                this.ihm.enteredRoom(room);
            });
    
            this.ihm.emitter.on('ready', data => {
                this.server.registerPlayer(data);
            });

            this.server.emitter.on('newPlayer', player => {
                this.ihm.newPlayer(player);
            });

            this.server.emitter.on('letsgo', () => {
                resolve();
            })
        }
        return new Promise(fn);
    }
}