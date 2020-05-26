import { Case } from "./Case";
import { Scene, AssetContainer } from "babylonjs";

export class CaseCollection
{
    private cases: Array<Case> = [];

    constructor (
        private scene: Scene,
        private container: AssetContainer
    ) {}

    initTo (x: number, y: number): void {
        for (let i = 1; i <= x; i++) {
            for (let j = 1; j <= y; j++) {
                this.add(i, j);
            }
        }
    }

    private add (x: number, y: number): void {
        this.cases.push(
            new Case(this.scene, this.container, {x, y})
        );
    }

    get length (): number {
        return this.cases.length;
    }

    get all (): Array<Case> {
        return this.cases;
    }
}