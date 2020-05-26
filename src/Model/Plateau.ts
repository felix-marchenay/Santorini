import { Scene, Mesh, MeshBuilder, AssetContainer } from "babylonjs";
import { CaseCollection } from "./CaseCollection";

export class Plateau
{
    private mesh: Mesh;
    public cases: CaseCollection;

    constructor(
        private scene: Scene,
        private container: AssetContainer
    ) {
        this.mesh = MeshBuilder.CreateBox("", {}, this.scene);
        this.cases = new CaseCollection(this.scene, this.container);
        this.cases.initTo(5, 5);
        this.mesh;
    }
}