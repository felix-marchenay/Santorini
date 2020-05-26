import { Scene, AbstractMesh } from "babylonjs";
import { CaseCollection } from "./CaseCollection";
import { MeshLoader } from "../MeshLoader";

export class Plateau
{
    private meshes: Array<AbstractMesh> = [];
    public cases: CaseCollection;

    constructor(
        private scene: Scene,
    ) {
        this.cases = new CaseCollection(this.scene);
        this.cases.initTo(5, 5);
        this.meshes.push(
            MeshLoader.load('ile'),
            MeshLoader.load('plateau'),
            MeshLoader.load('colonnes'),
        );
        this.meshes.forEach(mesh => mesh.receiveShadows = true);
    }
}