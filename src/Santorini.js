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
            this.emitter.emit('ready');
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this.server = new Server();
        this.stepper = new Stepper;
        this.ihm = new Interface;
        this.preparation = new Preparation(this.ihm, this.server, this.scene);
        this.game = null;

        console.log(this.scene);
    }

    async ignition() {
        const game = await this.preparation.launch();

        game.play();
        
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}