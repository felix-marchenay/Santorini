import { Jeu } from "./Model/Jeu";
import { Interface } from "./Interface";
import { Scene, Engine, SceneLoader, ArcRotateCamera, Vector3, PointLight } from "babylonjs";
import { Joueur } from "./Model/Joueur";
import { infosJoueur } from "./InfosJoueur";
import { Container } from "./Container";
import { Normalizer } from "./Normalizer/Normalizer";
import { Server } from "./Server";
import { TypeJoueur } from "./Model/TypeJoueur";

export class Setup
{
    private scene: Scene;
    private fps: number[] = [];
    private serverId: string = '';

    constructor (
        private ihm: Interface,
        private engine: Engine,
        private normalizer: Normalizer,
        server?: Server
    ) {
        this.scene = this.createScene();
        SceneLoader.LoadAssetContainer("./model/", "pieces.babylon", this.scene, (container) => {
            Container.init(container);
        });

        this.ihm.on('goSingleplayer', joueurs => {
            joueurs = joueurs.map((j: any, i: any) => {
                j.pionsIds = [2*i+1, 2*i+2];
                j.id = i;
                return j;
            });
            this.setup(joueurs).play();
        });
        this.ihm.on('connect', (room: string) => {
            server?.action('connection', room);
        });
        this.ihm.on('playerInfo_TX', data => {
            server?.action('playerInfo_TX', data);
        });
        this.ihm.on('quitRoom', () => {
            server?.action('disconnection', null);
        });

        server?.on('enteredRoom', data => {
            this.serverId = data.you;
            this.ihm.action('enteredRoom', data)
        });
        server?.on('playerInfo_RX', player => {
            this.ihm.action('playerInfo_RX', player);
        });
        server?.on('disconnection', player => {
            this.ihm.action('removePlayer', player);
        });
        server?.on('connected', id => {
            this.ihm.action('connected', id);
        });
        server?.on('letsgo', data => {
            const joueurs = data.joueurs.map((player: any,i: number) => {
                return {
                    name: player.name,
                    order: i+1,
                    divinite: player.divinite,
                    type: (player.id === this.serverId) ? TypeJoueur.humain : TypeJoueur.distant,
                    id: player.id,
                    pionsIds: player.pions.map((pion: any) => pion.id)
                };
            });
            this.setup(joueurs, server).play();
        });
    }

    private setup(infosJoueurs: Array<infosJoueur>, server?: Server): Jeu {
        const joueurs = infosJoueurs.map(info => Joueur.fromInfos(info, this.scene));
        
        this.ihm.action('launchSingle', joueurs.map(j => this.normalizer.normalize(j)));
        
        return new Jeu(
            this.scene,
            this.ihm,
            joueurs,
            server
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
    
        const lightPosition3 = new Vector3(7, 15, -15);
        const light3 = new PointLight("light", lightPosition3, this.scene);
        light3.intensity = 600;

        const lightPosition4 = new Vector3(-8, 20, 10);
        const light4 = new PointLight("light", lightPosition4, this.scene);
        light4.intensity = 500;
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