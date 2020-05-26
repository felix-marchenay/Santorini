import { AbstractMesh, Scene, ActionManager } from "babylonjs";
import { Construction } from "./Construction";
import { MeshLoader } from "../MeshLoader";

export class Dome implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene
    ) {
        this.mesh = MeshLoader.load('etage-dome');
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau (): number {
        return 4;
    }

    get prochainNiveau(): number {
        throw "Pas de prochain niveau sur le dome";
    }

    estUnDome(): boolean {
        return true;
    }
}