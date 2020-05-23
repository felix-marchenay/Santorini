import { SceneLoader, Scene, Engine } from 'babylonjs';
import { Emitter } from './src/Infrastructure/Emitter/Emitter';
import { Interface } from './src/Infrastructure/Interface';

export class Santorini 
{
    public emitter: Emitter = new Emitter;
    private engine: Engine;
    private interface: Interface = new Interface;

    constructor() {
        const canvas = <HTMLCanvasElement> document.querySelector('#render');
        this.engine = new Engine(canvas, true, { stencil: true});
        // const scene = new Scene(this.engine);
        // this.scene = new SantoriniScene(scene, canvas);
        // this.server = null;

        // SceneLoader.LoadAssetContainer("./models/", "pieces.babylon", this.scene.scene, (container) => {
        //     this.scene.scene.container = container;
        //     console.log(container);
        //     this.emitter.emit('ready');
        // });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    async ignition() {

    }
}