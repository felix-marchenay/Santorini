import { Scene, AbstractMesh, ActionManager } from "babylonjs";
import { Construction } from "./Construction";
import { MeshLoader } from "../MeshLoader";

export class Etage implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene,
        private slug: string,
        private nv: number
    ) {
        this.mesh = MeshLoader.load('etage-' + this.slug);
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau ():number {
        return this.nv;
    }

    get prochainNiveau(): number {
        return this.nv + 1;
    }

    estUnDome(): boolean {
        return false;
    }

    differenceDeNiveauAvec (construction: Construction): number {
        return construction.niveau - this.niveau;
    }
}