import io from 'socket.io-client';
import { Emitter } from './infrastructure/Emitter';

export class Server
{
    constructor() {
        this.emitter = new Emitter;
        this.host = '192.168.1.14';
        this.port = '4949'
        this.socket = null;
    }

    connect (roomName) {
        const fn = (resolve, reject) => {
            this.socket = io('http://' + this.host + ':' + this.port);
    
            this.socket.on('connected', () => {
                this.socket.emit('register', roomName);
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

            this.socket.on('newPlayer', player => {
                this.emitter.emit('newPlayer', player);
            });

            this.socket.on('letsgo', room => {
                this.emitter.emit('letsgo', room);
            });

            this.socket.on('idlePion', data => {
                this.emitter.emit('idlePion', data);
            });
        }

        return new Promise(fn);
    }

    emit(event ,data) {
        this.socket.emit(event, data);
    }

    registerPlayer(player) {
        this.socket.emit('addPlayer', player);
    }
}