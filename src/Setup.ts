import { Jeu } from "./Jeu";
import { Interface } from "./Interface";
import { Scene, Engine } from "babylonjs";
import { Joueur } from "./Joueur";

export class Setup
{
    private scene: Scene;

    constructor (
        private ihm: Interface,
        private canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.scene = this.createScene();
        this.ihm.on('goSingleplayer', joueurs => {
            this.setup(joueurs).start();
        });
    }

    private setup(infosJoueurs: [{name: string}]): Jeu {
        const joueurs = infosJoueurs.map(info => Joueur.fromInfos(info));

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

        const engine = new Engine(this.canvas);
        const scene = new Scene(engine);

        window.addEventListener('resize', () => {
            engine.resize();
        });

        return scene;
    }
}