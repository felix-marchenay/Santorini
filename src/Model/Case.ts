import { Scene, AssetContainer, AbstractMesh, ActionManager } from "babylonjs";

export class Case
{
    private mesh: AbstractMesh;

    constructor (
        private scene: Scene,
        private container: AssetContainer,
        public coordonnees: {x: number, y: number},
    ) {
        const caseName = "case"+this.coordonnees.x+this.coordonnees.y;
        let mesh =  this.container.meshes.find(m => m.id == 'case');

        if (mesh === undefined) {
            throw "Mesh " + caseName + " introuvable";
        }

        const clone = mesh.clone(caseName, null);
        
        if (clone === null) {
            throw "Inclonable";
        }
        
        this.mesh = mesh;
        this.mesh.actionManager = new ActionManager(this.scene);
    }
}