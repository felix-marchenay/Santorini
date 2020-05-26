import { Scene, AbstractMesh, ActionManager, Vector3 } from "babylonjs";
import { ConstructionCollection } from "./ConstructionCollection";
import { MeshLoader } from "../MeshLoader";

export class Case
{
    private mesh: AbstractMesh;
    private constructions: ConstructionCollection = new ConstructionCollection;

    constructor (
        private scene: Scene,
        public coordonnees: {x: number, y: number},
    ) {
        const caseName = "case"+this.coordonnees.x+this.coordonnees.y;
        this.mesh = MeshLoader.load(caseName, 'case');
        this.mesh.position = new Vector3(3.1 * this.coordonnees.x - 6.2, 0, 3.1 * this.coordonnees.y - 6.2);
        this.mesh.actionManager = new ActionManager(this.scene);
    }

    private distanceDe (caze: Case): number {
        return Math.max(
            Math.abs(caze.coordonnees.x - this.coordonnees.x),
            Math.abs(caze.coordonnees.y - this.coordonnees.y),
        );
    }

    get niveau (): number {
        return this.constructions.niveau;
    }

    get estDuPerimetre (): boolean {
        return this.coordonnees.x == 1 || this.coordonnees.x == 5 || this.coordonnees.y == 5 || this.coordonnees.y == 1;
    }

    avoisine (caze: Case): boolean {
        return this.distanceDe(caze) === 1;
    }

    estComplete (): boolean {
        return this.constructions.complet();
    }

    aUnDome(): boolean {
        return this.constructions.aUnDome();
    }
}