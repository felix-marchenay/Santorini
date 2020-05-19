import { SantoriniScene } from "./SantoriniScene";
import { Engine, SceneLoader } from "babylonjs";
import { Game } from "./Game";
import { Interface } from "./ihm/Interface";
import { Scene } from "@babylonjs/core";
import { Preparation } from "./Preparation";
import { Stepper } from "./infrastructure/Stepper";
import { Server } from "./Server";
import { Emitter } from "./infrastructure/Emitter";

export class Santorini 
{
    constructor(container) {
        this.emitter = new Emitter();
        const canvas = document.querySelector('#render');
        this.engine = new Engine(canvas, true, { stencil: true});
        const scene = new Scene(this.engine);
        this.scene = new SantoriniScene(scene, canvas);
        this.server = null;

        SceneLoader.LoadAssetContainer("./models/", "pieces.babylon", this.scene.scene, (container) => {
            this.scene.scene.container = container;
            console.log(container);
            this.emitter.emit('ready');
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this.server = new Server();
        this.ihm = new Interface;
        this.game = null;
    }

    async ignition() {

        await this.launch();
        
        this.engine.runRenderLoop(() => {
            this.scene.render();
            this.scene.showFPS(this.engine);
        });
    }

    async launch() {
        this.preparation = new Preparation(this.ihm, this.server, this.scene);
        
        this.game = await this.preparation.launch();

        this.game.play();
    }
}