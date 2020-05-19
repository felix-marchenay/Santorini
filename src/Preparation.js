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
import { Triton } from "./divinite/Triton";
import { Zeus } from "./divinite/Zeus";
import { Minotaur } from "./divinite/Minotaur";

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
                this.id = room.you;
                this.ihm.enteredRoom(room);
            });
    
            this.ihm.emitter.on('refreshPlayer', data => {
                this.server.emit('refreshPlayer', data);
            });

            this.server.emitter.on('newPlayer', player => {
                this.ihm.newPlayer(player);
            });

            this.server.emitter.on('disconnection', player => {
                this.ihm.removePlayer(player);
            });

            this.server.emitter.on('letsgo', room => {

                const joueurs = room.joueurs.map((p, i) => 
                    new Joueur(i+1, p.name, Game.diviniteFromString(p.divinite), this.scene.scene, p.id, (p.id !== this.id), p.pions)
                );

                this.ihm.letsGo(joueurs);

                resolve(new Game(this.scene.scene, this.ihm, joueurs, this.server));
            });

            this.ihm.emitter.on('quitRoom', () => {
                this.server.disconnect();
            });

            this.ihm.emitter.on('goSingleplayer', players => {

                const joueurs = players.map((p, i) => 
                    new Joueur(i+1, p.name, p.divinite, this.scene.scene, i, false, [{id:0},{id:1}], p.type == 'cpu')
                );

                this.ihm.letsGo(joueurs);
                resolve(new Game(this.scene.scene, this.ihm, joueurs));
            });

            // const joueurs = [
            //     new Joueur(1, "John", new NoDivinite, this.scene.scene, 12, false, [11, 12], true),
            //     new Joueur(2, "Bernie", new NoDivinite, this.scene.scene, 15, false, [13, 14], true),
            // ];
            
            // this.ihm.letsGo(joueurs);
            // resolve(new Game(this.scene.scene, this.ihm, joueurs));
        }
        return new Promise(fn);
    }
}