import { AssetContainer, Scene, Mesh } from "babylonjs";

export class FakeAsetContainer extends AssetContainer
{
    constructor (scene: Scene) {
        super(scene);

        this.meshes.push(
            new Mesh("case", this.scene),
            new Mesh("etage-1", this.scene),
            new Mesh("etage-2", this.scene),
            new Mesh("etage-3", this.scene),
            new Mesh("etage-dome", this.scene),
            new Mesh("ile", this.scene),
            new Mesh("plateau", this.scene),
            new Mesh("colonnes", this.scene),
        );
    }
}