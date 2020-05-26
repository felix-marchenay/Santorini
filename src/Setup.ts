import { Jeu } from "./Model/Jeu";
import { Interface } from "./Interface";
import { Scene, Engine, SceneLoader, AssetContainer } from "babylonjs";
import { Joueur } from "./Model/Joueur";

export class Setup
{
    private scene: Scene;
    private container?: AssetContainer;

    constructor (
        private ihm: Interface,
        private engine: Engine
    ) {
        this.scene = this.createScene();
        this.ihm.on('goSingleplayer', joueurs => {
            this.setup(joueurs).start();
        });

        SceneLoader.LoadAssetContainer("./models/", "pieces.babylon", this.scene, (container) => {
            this.container = container;
        });
    }

    private setup(infosJoueurs: [{name: string}]): Jeu {
        const joueurs = infosJoueurs.map(info => Joueur.fromInfos(info));

        if (this.container === undefined) {
            throw "Container pas encore là";
        }
        
        return new Jeu(
            this.scene,
            this.container,
            this.ihm,
            joueurs
        );
    }

    private createScene(): Scene {
        if (this.scene) {
            this.scene.dispose();
        }

        const scene = new Scene(this.engine);

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        return scene;
    }
}