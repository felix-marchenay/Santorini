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

    caseSuivante(case1: Case, case2: Case): Case {
        
        if (!case2.avoisine(case1)) {
            throw "Les cases doivent être avoisinantes";
        }

        const x = case1.coordonnees.x + 2*(case2.coordonnees.x - case1.coordonnees.x);
        const y = case1.coordonnees.y + 2*(case2.coordonnees.y - case1.coordonnees.y);

        if (x > 5 || y > 5) {
            throw "Pas de case suivante";
        }

        return this.getCase(x, y);
    }

    vider () {
        this.cases.vider();
    }
}