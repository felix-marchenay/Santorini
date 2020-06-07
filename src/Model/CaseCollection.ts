import { Case } from "./Case";
import { Scene } from "babylonjs";

export class CaseCollection
{
    private cases: Array<Case> = [];

    constructor (
        private scene: Scene
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
            new Case(this.scene, {x, y})
        );
    }

    get length (): number {
        return this.cases.length;
    }

    get all (): Array<Case> {
        return this.cases;
    }

    get disponibles (): Case[] {
        return this.cases.filter(c => !c.estOccupée);
    }

    find(x: number, y: number): Case {
        const caze = this.cases.find(c => c.coordonnees.x === x && c.coordonnees.y === y);
        if (caze === undefined) {
            throw "Case " + x + "," + y + " introuvable";
        }
        return caze;
    }

    avoisinantes(caze: Case): Case[] {
        return this.cases.filter(c => c.avoisine(caze));
    }

    vider() {
        this.cases.forEach(c => {
            c.vider();
        });
    }
}