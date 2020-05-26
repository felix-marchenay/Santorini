import { Case } from "./Case";
import { Scene, AssetContainer } from "babylonjs";

export class CaseCollection
{
    private cases: Array<Case> = [];

    constructor (
        private scene: Scene,
        private container: AssetContainer
    ) {}

    add (x: number, y: number) {
        this.cases.push(
            new Case(this.scene, this.container, {x, y})
        );
    }
}