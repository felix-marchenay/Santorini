import { Emitter } from './Infrastructure/Emitter/Emitter';
import { Interface } from './Interface';
import App from '../Template/App.vue';
import { Setup } from './Setup';

export class Santorini 
{
    public emitter: Emitter = new Emitter;
    private interface: Interface;

    constructor() {
        // SceneLoader.LoadAssetContainer("./models/", "pieces.babylon", this.scene.scene, (container) => {
        //     this.scene.scene.container = container;
        //     console.log(container);
        //     this.emitter.emit('ready');
        // });
        this.interface = new Interface(App);

    }

    async ignition() {
        new Setup(this.interface, <HTMLCanvasElement> document.querySelector('canvas'));
    }
}