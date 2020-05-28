import { Scene, AbstractMesh } from "babylonjs";
import { CaseCollection } from "./CaseCollection";
import { Container } from "../Container";

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
            Container.loadMesh('ile'),
            Container.loadMesh('plateau'),
            Container.loadMesh('colonnes'),
        );
        this.meshes.forEach(mesh => mesh.receiveShadows = true);
    }
}