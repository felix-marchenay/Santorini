import { AssetContainer, AbstractMesh, Material } from "babylonjs";

export class Container
{
    private static container: AssetContainer;

    public static init (container: AssetContainer): void {
        Container.container = container;
    }

    static loadMesh(name: string, id?: string): AbstractMesh {

        if (id === undefined) {
            id = name;
        }

        let mesh =  Container.container.meshes.find(m => m.id == id);

        if (mesh === undefined) {
            throw "Mesh " + id + " introuvable";
        }

        const clone = mesh.clone(name, null);
        
        if (clone === null) {
            throw name + " Inclonable";
        }

        return clone;
    }

    static loadMaterial (name: string): Material {
        const material = Container.container.materials.find(m => m.id === name);

        if (material === undefined) {
            throw "Material " + name + " introuvable";
        }

        return material;
    }
}