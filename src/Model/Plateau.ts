import { Scene, AbstractMesh } from "babylonjs";
import { CaseCollection } from "./CaseCollection";
import { Container } from "../Container";
import { Case } from "./Case";
import { Pion } from "./Pion";

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

    getCase (x: number, y:number): Case {
        return this.cases.find(x, y);
    }

    casesAvoisinantes(caze: Case): Case[] {
        return this.cases.avoisinantes(caze);
    }

    casesDisponibles (): Case[] {
        return this.cases.disponibles;
    }

    casesLaPlusHauteOuPionPeutAller(pion: Pion): Case {
        if (!pion.case) {
            throw "Le pion doit être posé sur une case";
        }

        return this
            .casesAvoisinantes(pion.case)
            .filter(c => pion.peutAller(c))
            .reduce((caze: Case, c: Case) => {
                if (caze.niveau < c.niveau) {
                    caze = c;
                }
                return caze;
            });
    }

    vider () {
        this.cases.vider();
    }
}