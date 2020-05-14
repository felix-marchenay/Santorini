import io from 'socket.io-client';
import { Emitter } from './infrastructure/Emitter';

export class Server
{
    constructor() {
        this.emitter = new Emitter;
        this.host = '192.168.1.14';
        this.port = '4949'
        this.socket = null;
        this.transitEvents = [
            'newPlayer', 'letsgo', 'idlePion', 'pionMove', 'pionMoveForce', 'construct', 'constructDome', 'endTurn', 'disconnection', 'victory'
        ];
    }

    connect (roomName) {
        const fn = (resolve, reject) => {
            this.socket = io('http://' + this.host + ':' + this.port);
    
            this.socket.on('connected', () => {
                this.socket.emit('register', roomName);
            });

            this.socket.on('enteredRoom', room => {
                this.emitter.emit('entered', room);
            });

            this.socket.on('someoneEnteredRoom', newPlayer => {
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
}