import { AssetContainer, AbstractMesh } from "babylonjs";

export class MeshLoader
{
    public static container: AssetContainer;

    static load(name: string, id?: string): AbstractMesh {

        if (id === undefined) {
            id = name;
        }

        let mesh =  MeshLoader.container.meshes.find(m => m.id == id);

        if (mesh === undefined) {
            throw "Mesh " + id + " introuvable";
        }

        const clone = mesh.clone(name, null);
        
        if (clone === null) {
            throw name + " Inclonable";
        }

        return clone;
    }
}