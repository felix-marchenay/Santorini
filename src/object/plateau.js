import { 
    MeshBuilder,
    Color3,
    ActionManager,
    InterpolateValueAction,
    HemisphericLight,
    Vector3,
    IncrementValueAction,
    StandardMaterial,
    PlayAnimationAction
} from "@babylonjs/core";

import {
    NormalMaterial
} from "@babylonjs/materials";

import { Pion } from "./pion";
import { Case } from "./case";
import { Emitter } from "../infrastructure/Emitter";

export class Plateau {

    constructor (scene) {
        this.emitter = new Emitter;
        this.scene = scene;
        this.nbCases = [5, 5];
        this.dimensions = {h: 0.5, w: 12.5, d: 12.5};
        this.meshes = [];
        this.cases = this.genererCases();
        this.createBoard();
        this.casePicked = null;
    }

    genererCases () {
        const cases = [];
        for (let x = 0; x < this.nbCases[0]; x++) {
            if (!cases[x]) {
                cases[x] = [];
            }
            for (let y = 0; y < this.nbCases[1]; y++) {
                cases[x][y] = new Case(this.scene, x, y);
            }
        }
        return cases;
    }

    createBoard() {
        this.meshes.push(this.scene.container.meshes.find(mesh => mesh.id == 'ile').clone());
        this.meshes.push(this.scene.container.meshes.find(mesh => mesh.id == 'plateau').clone());
        this.meshes.push(this.scene.container.meshes.find(mesh => mesh.id == 'colonnes').clone());

        this.meshes.forEach(mesh => mesh.receiveShadows = true);
    }

    casesAvoisinantes(caseA) {
        return this.allCases().filter(caseB => caseB.estAvoisinante(caseA));
    }
    
    casesAvoisinantesEtElleMeme(caseA) {
        return [...this.allCases().filter(caseB => caseB.estAvoisinante(caseA)), caseA];
    }

    showBuildHintAround (caze) {
        this.showBuildHint(
            this.casesAvoisinantes(caze).filter(caze => caze.isBuildable())
        );
    }

    showBuildHintZeusAround (caze) {
        this.showBuildHint([
            ...this.casesAvoisinantes(caze).filter(caze => caze.isBuildable()),
            caze
        ]);
    }

    showBuildHintDomeAround (caze) {
        this.showBuildHintDome(
            this.casesAvoisinantes(caze).filter(caze => caze.isBuildable())
        );
    }

    casesDistanceDe(caze, nb) {
        return this.allCases().filter(case1 => case1.distanceDe(caze) === 2);
    }

    caseEntre(case1, case2) {
        if (case1.distanceDe(case2) != 2) {
            throw "Case trop distante"
        }

        return this.getCase(
            (case2.coordinates.x - case1.coordinates.x)/2 + case1.coordinates.x,
            (case2.coordinates.y - case1.coordinates.y)/2 + case1.coordinates.y,
        );
    }

    hideBuildHint() {
        this.allCases().forEach(cas => {
            cas.hideBuildHint();
        });
    }
    
    showBuildHint (cases) {
        cases.map(cas => cas.showBuildHint());
    }

    showBuildHintDome (cases) {
        cases.map(cas => cas.showBuildHintDome());
    }

    refreshBuildHint(caze) {
        caze.hideBuildHint();
        caze.showBuildHint();
    }

    allCases() {
        return this.cases.reduce((carry, ligne) => {
            carry.push(...ligne);
            return carry;
        }, []);
    }

    vider() {
        this.allCases().forEach(cas => {
            cas.pion = null;
            cas.dispose();
        });
    }

    caseSuivante(case1, case2) {
        if (!case2.estAvoisinante(case1)) {
            throw "Les cases doivent être avoisinantes";
        }

        const x = case1.coordinates.x + 2*(case2.coordinates.x - case1.coordinates.x);
        const y = case1.coordinates.y + 2*(case2.coordinates.y - case1.coordinates.y);

        if (x > 4 || y > 4) {
            throw "Pas de case suivante";
        }

        return this.getCase(x, y);
    }

    getCase(x, y) {
        return this.allCases().find(cas => cas.coordinates.x == x && cas.coordinates.y == y);
    }
}