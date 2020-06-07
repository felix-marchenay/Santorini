import { Emitter } from './Infrastructure/Emitter/Emitter';
import { Interface } from './Interface';
import App from './Template/App.vue';
import { Setup } from './Setup';
import { Engine } from 'babylonjs';
import { JoueurNormalizer } from './Normalizer/JoueurNormalizer';
import { Server } from './Server';

export class Santorini 
{
    public emitter: Emitter = new Emitter;
    private interface: Interface;

    constructor() {
        this.interface = new Interface(App);
    }

    async ignition() {
        new Setup(
            this.interface,
            new Engine(
                document.querySelector('canvas')
            ),
            new JoueurNormalizer,
            new Server(
                'http',
                'localhost',
                4949
            )
        );
    }
}