import { AssetContainer, Scene, Mesh } from "babylonjs";

export class FakeAsetContainer extends AssetContainer
{
    constructor (scene: Scene) {
        super(scene);

        this.meshes.push(
            new Mesh("case", this.scene)
        );
    }
}