import { AssetContainer, AbstractMesh } from "babylonjs";

export class MeshLoader
{
    public static container: AssetContainer;

    static load(name: string): AbstractMesh {

        let mesh =  MeshLoader.container.meshes.find(m => m.id == 'case');

        if (mesh === undefined) {
            throw "Mesh " + name + " introuvable";
        }

        const clone = mesh.clone(name, null);
        
        if (clone === null) {
            throw name + " Inclonable";
        }

        return mesh;
    }
}