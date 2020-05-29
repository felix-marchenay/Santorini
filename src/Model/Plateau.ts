import { Scene, AbstractMesh } from "babylonjs";
import { CaseCollection } from "./CaseCollection";
import { Container } from "../Container";
import { Case } from "./Case";

export class Plateau
{
    private meshes: Array<AbstractMesh> = [];
    private cases: CaseCollection;

    constructor(
        private scene: Scene,
    ) {
        this.cases = new CaseCollection(this.scene);
        this.cases.initTo(5, 5);
        this.meshes.push(
            Container.loadMesh('ile'),
            Container.loadMesh('plateau'),
            Container.loadMesh('colonnes'),
        );
        this.meshes.forEach(mesh => mesh.receiveShadows = true);
    }

    get allCases (): Case[] {
        return this.cases.all;
    }

    casesAvoisinantes(caze: Case): Case[] {
        return this.cases.avoisinantes(caze);
    }
}