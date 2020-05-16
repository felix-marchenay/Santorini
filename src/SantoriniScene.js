import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, ShadowGenerator, PointLight, Scene, PointerEventTypes, SpotLight } from "babylonjs";
import { Game } from "./Game";
import { DirectionalLight } from "@babylonjs/core";

export class SantoriniScene
{
    constructor(scene, canvas) {
        this.scene = scene;
        this.canvas = canvas;
        this.camera = this.arcCamera();
        this.lights = this.hemisphericLights();

        this.shadows = [this.lights[1]].map(l => new ShadowGenerator(512, l));
        this.shadows.forEach(sh => {
            sh.usePercentageCloserFiltering = true;
        });
        this.scene.shadows = this.shadows;

        this.hoverMeshes = [];

        // scene.onKeyboardObservable.add(keyInfo => {
        //     switch (keyInfo.type) {
        //         case BABYLON.KeyboardEventTypes.KEYDOWN:
        //             this.emitter.emit('keyDown', keyInfo.event);
        //             this.emitter.emit('keyDown-'+keyInfo.event.code);
        //             break;
        //         case BABYLON.KeyboardEventTypes.KEYUP:
        //             this.emitter.emit('keyUp', keyInfo.event);
        //             this.emitter.emit('keyUp-'+keyInfo.event.code);
        //             break;
        //     }
        // });
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
        // const lightPosition1 = new Vector3(0, 20, 2);
        // const light1 = new HemisphericLight("light", lightPosition1, this.scene);
        // light1.intensity = 0.65;
        // const lightBox = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox.position = lightPosition1;
        
        const lightPosition2 = new Vector3(-6, 15, -10);
        const light2 = new PointLight("light", lightPosition2, this.scene);
        light2.intensity = 500;
        // const lightBox2 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox2.position = lightPosition2;
    
        const lightPosition3 = new Vector3(7, 15, -15);
        const light3 = new PointLight("light", lightPosition3, this.scene);
        light3.intensity = 600;
        // const lightBox3 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox3.position = lightPosition3;

        const lightPosition4 = new Vector3(-8, 20, 10);
        const light4 = new PointLight("light", lightPosition4, this.scene);
        light4.intensity = 500;
        // const lightBox4 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox4.position = lightPosition4;

        return [light4, light2, light3];
    }

    showFPS(engine) {
        if (!this.fps) {
            this.fps = [];
        }

        const fps = engine.getFps().toFixed();
        if (fps !== "Infinity") {
            this.fps.push(parseInt(fps));
        }

        if (this.fps.length > 30) {
            this.fps = this.fps.slice(1);
            console.log(this.fps.reduce((a,b) => a+b) / this.fps.length);
        }
    }

    render() {
        this.scene.render();
    }
}