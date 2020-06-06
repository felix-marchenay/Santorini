import { Jeu } from "./Model/Jeu";
import { Interface } from "./Interface";
import { Scene, Engine, SceneLoader, ArcRotateCamera, Vector3, PointLight } from "babylonjs";
import { Joueur } from "./Model/Joueur";
import { infosJoueur } from "./InfosJoueur";
import { Container } from "./Container";
import { Normalizer } from "./Normalizer/Normalizer";

export class Setup
{
    private scene: Scene;
    private fps: number[] = [];

    constructor (
        private ihm: Interface,
        private engine: Engine,
        private normalizer: Normalizer
    ) {
        this.scene = this.createScene();
        this.ihm.on('goSingleplayer', joueurs => {
            this.setup(joueurs).play();
        });

        SceneLoader.LoadAssetContainer("./model/", "pieces.babylon", this.scene, (container) => {
            Container.init(container);
        });
    }

    private setup(infosJoueurs: Array<infosJoueur>): Jeu {
        const joueurs = infosJoueurs.map(info => Joueur.fromInfos(info, this.scene));
            
        this.ihm.action('launchSingle', joueurs.map(j => this.normalizer.normalize(j)));
        
        return new Jeu(
            this.scene,
            this.ihm,
            joueurs
        );
    }

    private createScene(): Scene {
        if (this.scene) {
            this.scene.dispose();
        }

        const scene = new Scene(this.engine);
        // scene.debugLayer.show();

        this.setElementsUp();

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this.engine.runRenderLoop(() => {
            this.scene.render();
            this.showFPS(this.engine);
        });

        return scene;
    }

    private setElementsUp(): void {
        var camera = new ArcRotateCamera("camera", Math.PI / 12, Math.PI / 4, 20, Vector3.Zero(), this.scene);
        camera.allowUpsideDown = false;
        camera.wheelPrecision = 10;
        camera.lowerRadiusLimit = 15;
        camera.upperRadiusLimit = 50;
        camera.upperBetaLimit = Math.PI / 2.1;
        
        const canvas = document.querySelector('canvas');
        if (canvas) {
            camera.attachControl(canvas, true);
        }
        
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
    }

    private showFPS(engine: Engine): void {
        if (!this.fps) {
            this.fps = [];
        }

        const fps = engine.getFps().toFixed();
        if (fps !== "Infinity") {
            this.fps.push(parseInt(fps));
        }

        if (this.fps.length > 150) {
            this.fps = this.fps.slice(1);
            const el = document.querySelector('.fps');
            if (el) {
                el.innerHTML =
                    Math.floor(this.fps.reduce((a,b) => a+b) / this.fps.length) + ' - ' + 
                    Math.floor(parseInt(fps));
            }
        }
    }
}