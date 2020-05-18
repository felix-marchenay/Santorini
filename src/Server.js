import io from 'socket.io-client';
import { Emitter } from './infrastructure/Emitter';
import { Game } from './Game';

export class Server
{
    constructor() {
        this.emitter = new Emitter;
        this.host = 'localhost';
        this.port = '4949';
        this.protocol = 'http';;
        this.socket = null;
        this.transitEvents = [
            'newPlayer', 'letsgo', 'idlePion', 'pionMove', 'pionMoveForce', 'construct', 'constructDome', 'endTurn', 'disconnection', 'victory', 'replay'
        ];
    }

    connect (roomName) {
        const fn = (resolve, reject) => {
            this.socket = io(this.protocol + '://' + this.host + ':' + this.port);
    
            this.socket.on('connected', () => {
                this.socket.emit('register', roomName);
            });

            this.socket.on('enteredRoom', room => {
                this.emitter.emit('entered', room);
            });

            this.socket.on('newPlayer', newPlayer => {
                newPlayer.divinite = Game.diviniteFromString(newPlayer.divinite);
                this.emitter.emit('newPlayer', newPlayer);
            });

            this.socket.on('noRoom', (e) => {
                reject("Server error : " + e);
            });

            this.transitEvents.forEach(ev => {
                this.socket.on(ev, data => {
                    this.emitter.emit(ev, data);
                });
            });
        }

        return new Promise(fn);
    }

    emit(event ,data) {
        this.socket.emit(event, data);
    }

    disconnect() {
        this.socket.emit('disconnection');
    }
}