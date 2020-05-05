import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "babylonjs";
import { Game } from "./Game";

export class SantoriniScene
{
    constructor(scene, canvas) {
        this.scene = scene;
        this.canvas = canvas;
        this.camera = this.arcCamera();
        this.lights = this.hemisphericLights();

        this.game = new Game(this.scene);
    }

    arcCamera() {
        var camera = new ArcRotateCamera("camera", Math.PI / 12, Math.PI / 4, 20, Vector3.Zero(), this.scene);
        camera.allowUpsideDown = false;
        camera.wheelPrecision = 10;
        camera.lowerRadiusLimit = 15;
        camera.upperRadiusLimit = 50;
        camera.upperBetaLimit = Math.PI / 2.1;
        
        camera.attachControl(this.canvas, true);

        return camera;
    }

    hemisphericLights() {
        const lightPosition1 = new Vector3(-25, 20, 25);
        const light1 = new HemisphericLight("light", lightPosition1, this.scene);
        light1.intensity = 0.45;
        const lightBox = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        lightBox.position = lightPosition1;
        
        const lightPosition2 = new Vector3(30, 17, 45);
        const light2 = new HemisphericLight("light", lightPosition2, this.scene);
        light2.intensity = 0.3;
        const lightBox2 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        lightBox2.position = lightPosition2;
    
        const lightPosition3 = new Vector3(-18, 15, -32);
        const light3 = new HemisphericLight("light", lightPosition3, this.scene);
        light3.intensity = 0.35;
        const lightBox3 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        lightBox3.position = lightPosition3;

        return [light1, light2, light3];
    }

    render() {
        this.scene.render();
    }

    setGame(game) {
        this.game = game;
    }
}