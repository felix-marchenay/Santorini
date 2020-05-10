import io from 'socket.io-client';
import { Emitter } from './infrastructure/emitter';

export class Server
{
    constructor(joueur) {
        this.emitter = new Emitter;
        this.host = 'localhost';
        this.port = '4949'
        this.socket = null;
        this.joueur = joueur;
    }

    connect (roomName) {
        const fn = (resolve, reject) => {
            this.socket = io('http://' + this.host + ':' + this.port);
    
            this.socket.on('connected', () => {
                this.socket.emit('register', {
                    joueur : this.joueur.name,
                    roomName
                });
            });

            this.socket.on('enteredRoom', room => {
                console.log(room);
                this.emitter.emit('entered', room);
            });

            this.socket.on('someoneEnteredRoom', newPlayer => {
                console.log(newPlayer);
                this.emitter.emit('newPlayer', newPlayer);
            });

            this.socket.on('noRoom', (e) => {
                reject("Server error : " + e);
            });
        }

        return new Promise(fn);
    }
}