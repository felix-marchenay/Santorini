import { Scene, AssetContainer, AbstractMesh, ActionManager } from "babylonjs";
import { Construction } from "./Construction";

export class Etage implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene,
        private container: AssetContainer,
        private slug: string,
        private nv: number
    ) {
        let mesh =  this.container.meshes.find(m => m.id == 'etage-' + this.slug);

        if (mesh === undefined) {
            throw "Mesh etage introuvable";
        }

        const clone = mesh.clone("etage" + this.slug, null);
        
        if (clone === null) {
            throw "Inclonable";
        }

        this.mesh = mesh;
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau ():number {
        return this.nv;
    }
}