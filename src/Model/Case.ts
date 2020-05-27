import { Scene, AbstractMesh, ActionManager, Vector3 } from "babylonjs";
import { ConstructionCollection } from "./ConstructionCollection";
import { MeshLoader } from "../MeshLoader";
import { Pion } from "./Pion";

export class Case
{
    private mesh: AbstractMesh;
    private constructions: ConstructionCollection = new ConstructionCollection;
    private inPion: Pion | null = null;

    constructor (
        private scene: Scene,
        public coordonnees: {x: number, y: number},
    ) {
        const caseName = "case"+this.coordonnees.x+this.coordonnees.y;
        this.mesh = MeshLoader.load(caseName, 'case');
        this.mesh.position = new Vector3(3.1 * (this.coordonnees.x - 1) - 6.2, 0, 3.1 * (this.coordonnees.y - 1) - 6.2);
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

    get y(): number {
        if (this.constructions.dernierEtage === null) {
            return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
        }

        return this.constructions.dernierEtage.minimumY;
    }

    get positionPosePion(): Vector3 {
        const pionPosition = this.mesh.position.clone();
        pionPosition.y = this.y;
        return pionPosition;
    }

    get estComplete (): boolean {
        return this.constructions.complet();
    }

    get aUnDome(): boolean {
        return this.constructions.aUnDome();
    }

    get estOccupée (): boolean {
        return this.inPion !== null && !this.aUnDome;
    }

    construire (): void {
        if (this.estOccupée) {
            throw "On ne peut pas construire sur une case occupée";
        }

        this.constructions.construire();
    }

    poser(pion: Pion): void {
        pion.déplacerSur(this);
        this.inPion = pion;
    }

    libérer (): void {
        this.inPion = null;
    }

    differenceDeNiveauAvec (caze: Case): number {
        return this.constructions.niveau - caze.constructions.niveau;
    }

    avoisine (caze: Case): boolean {
        return this.distanceDe(caze) === 1;
    }
}