import { AbstractMesh, Scene, ActionManager } from "babylonjs";
import { Construction } from "./Construction";
import { Container } from "../Container";

export class Dome implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene
    ) {
        this.mesh = Container.loadMesh('etage-dome');
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau (): number {
        return 4;
    }

    get prochainNiveau(): number {
        throw "Pas de prochain niveau sur le dome";
    }

    get minimumY (): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    estUnDome(): boolean {
        return true;
    }
}