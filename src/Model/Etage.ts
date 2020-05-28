import { Scene, AbstractMesh, ActionManager } from "babylonjs";
import { Construction } from "./Construction";
import { Container } from "../Container";

export class Etage implements Construction
{
    private mesh: AbstractMesh;
    
    constructor (
        private scene: Scene,
        private slug: string,
        private nv: number
    ) {
        this.mesh = Container.loadMesh('etage-' + this.slug);
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    get niveau ():number {
        return this.nv;
    }

    get prochainNiveau(): number {
        return this.nv + 1;
    }

    get minimumY (): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    estUnDome(): boolean {
        return false;
    }

    differenceDeNiveauAvec (construction: Construction): number {
        return construction.niveau - this.niveau;
    }
}