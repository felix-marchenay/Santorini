import { SantoriniScene } from "./SantoriniScene";
import { Engine, SceneLoader } from "babylonjs";
import { Game } from "./Game";
import { Interface } from "./ihm/Interface";
import { Scene } from "@babylonjs/core";
import { Preparation } from "./Preparation";
import { Stepper } from "./infrastructure/Stepper";
import { Server } from "./Server";

export class Santorini 
{
    constructor(container) {
        const canvas = document.querySelector('#render');
        this.engine = new Engine(canvas);
        const scene = new Scene(this.engine);
        this.scene = new SantoriniScene(scene, canvas);
        this.server = null;

        SceneLoader.LoadAssetContainer("./models/", "pieces.babylon", this.scene.scene, (container) => {
            this.scene.scene.container = container;
        });

        this.server = new Server();
        this.stepper = new Stepper;
        this.ihm = new Interface;
        this.preparation = new Preparation(this.ihm, this.server);
        this.game = null;
    }

    async ignition() {
        const game = await this.preparation.launch();
        
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}