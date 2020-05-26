import { Scene, Mesh, MeshBuilder } from "babylonjs";

export class Plateau
{
    private mesh: Mesh;

    constructor(
        private scene: Scene,
    ) {
        this.mesh = MeshBuilder.CreateBox("", {}, this.scene);

        this.mesh;
    }
}