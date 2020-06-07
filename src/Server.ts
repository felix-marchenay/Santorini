import { EmitterInterface, Emitter, EmitterListener } from "./Infrastructure/Emitter/Emitter";
import io from 'socket.io-client';
import { ServerInterface } from "./ServerInterface";

export class Server implements EmitterInterface, ServerInterface
{
    private emitter: EmitterInterface = new Emitter;
    private socket: SocketIOClient.Socket | null = null;
    private events = [
        'newPlayer', 'pionSwitch', 'letsgo', 'idlePion', 
        'pionMove', 'pionMoveForce', 'construct', 'constructDome', 
        'endTurn', 'disconnection', 'victory', 'replay', 'enteredRoom',
        'connected', 'playerInfo_RX'
    ];

    constructor (
        private protocol: string,
        private host: string, 
        private port: number
    ) {}

    async connect () {
        return new Promise<null>(resolve => {
            this.socket = io(this.protocol + '://' + this.host + ':' + this.port);
    
            this.socket.on('connected', (data: any) => {

                this.events.forEach(ev => {
                    this.socket?.on(ev, (data: any) => {
                        console.log('REÇU : ', ev,  data);
                        this.emit(ev, data);
                    });
                });
            
                console.log('connected, id : ', data);
                resolve();
            });
        });
    }

    async action (event: string, data: any) {
        if (!this.socket?.connected) {
            await this.connect();
        }
        console.log('ENVOI : ', event, data);
        if (this.socket === null) {
            return;
        }

        this.socket.emit(event, data);
    }

    /**
     * Emitter
     */
    emit(event: string, data: any) {
        this.emitter.emit(event, data);    
    }

    on (event: string, f: EmitterListener): EmitterListener {
        return this.emitter.on(event, f);
    }

    off (event: string, f: EmitterListener): void {
        return this.emitter.off(event, f);
    }

    flush (): void {
        this.emitter.flush();
    }
}