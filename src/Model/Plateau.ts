import { Scene, Mesh, MeshBuilder, AssetContainer } from "babylonjs";
import { CaseCollection } from "./CaseCollection";

export class Plateau
{
    private mesh: Mesh;
    private cases: CaseCollection;

    constructor(
        private scene: Scene,
        private container: AssetContainer
    ) {
        this.mesh = MeshBuilder.CreateBox("", {}, this.scene);
        this.cases = new CaseCollection(this.scene, this.container);
        this.creerCases();
        this.container;
        this.mesh;
    }

    creerCases (): void {
        this.cases.add(5, 5);
    }
}