import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, ShadowGenerator, PointLight, Scene, PointerEventTypes } from "babylonjs";
import { Game } from "./Game";
import { DirectionalLight } from "@babylonjs/core";

export class SantoriniScene
{
    constructor(scene, canvas) {
        this.scene = scene;
        this.canvas = canvas;
        this.camera = this.arcCamera();
        this.lights = this.hemisphericLights();

        this.shadows = [this.lights[1], this.lights[2]].map(l => new ShadowGenerator(1500, l));
        this.shadows.forEach(sh => {
            sh.usePercentageCloserFiltering = true;
            sh.filteringQuality = ShadowGenerator.QUALITY_HIGH;
        });
        this.scene.shadows = this.shadows;

        this.shadow2 = new ShadowGenerator(1600, this.lights[2]);

        scene.onPointerObservable.add(pointerInfo => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERPICK:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerPicked === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerPicked(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERDOWN:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerDown === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerDown(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERUP:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerUp === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerUp(pointerInfo.pickInfo);
                        }
                    }
                    break;
                case PointerEventTypes.POINTERMOVE:
                    if (pointerInfo.pickInfo.pickedMesh) {
                        if (typeof pointerInfo.pickInfo.pickedMesh.pointerMove === 'function') {
                            pointerInfo.pickInfo.pickedMesh.pointerMove(pointerInfo.pickInfo);
                        }
                    }
                    break;
            }
        });

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
        const lightPosition1 = new Vector3(0, 20, 2);
        const light1 = new HemisphericLight("light", lightPosition1, this.scene);
        light1.intensity = 0.12;
        // const lightBox = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox.position = lightPosition1;
        
        const lightPosition2 = new Vector3(1, 15, 0);
        const light2 = new PointLight("light", lightPosition2, this.scene);
        light2.intensity = 200;
        // const lightBox2 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox2.position = lightPosition2;
    
        const lightPosition3 = new Vector3(4, 15, 10);
        const light3 = new PointLight("light", lightPosition3, this.scene);
        light3.intensity = 100;
        // const lightBox3 = MeshBuilder.CreateBox("lightBox", {}, this.scene);
        // lightBox3.position = lightPosition3;

        return [light1, light2, light3];
    }

    render() {
        this.scene.render();
    }
}