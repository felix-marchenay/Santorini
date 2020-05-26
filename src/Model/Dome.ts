import { AbstractMesh, Scene, AssetContainer, ActionManager } from "babylonjs";
import { Construction } from "./Construction";

export class Dome implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene,
        private container: AssetContainer
    ) {
        let mesh =  this.container.meshes.find(m => m.id == 'etage-dome');

        if (mesh === undefined) {
            throw "Mesh etage introuvable";
        }

        const clone = mesh.clone("etage-dome", null);
        
        if (clone === null) {
            throw "Inclonable";
        }

        this.mesh = mesh;
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau (): number {
        return 4;
    }
}