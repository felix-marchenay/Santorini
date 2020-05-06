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
import { Emitter } from "../infrastructure/emitter";

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
        return this.allCases().filter(caseB => caseB.estAvoisinante(caseA) && caseB != caseA);
    }

    showBuildHintAround (caze) {
        this.showBuildHint(
            this.casesAvoisinantes(caze).filter(caze => caze.isBuildable())
        );
    }
    
    showBuildHint (cases) {
        cases.map(cas => cas.showBuildHint());
    }

    showMoveHintAround(caze) {
        this.showMoveHint(
            this.casesAvoisinantes(caze)
        );
    }

    showMoveHint(cases) {
        cases.map(cas => cas.showMoveHint());
    }

    allCases() {
        return this.cases.reduce((carry, ligne) => {
            carry.push(...ligne);
            return carry;
        }, []);
    }

    getCase(x, y) {
        return this.allCases().find(cas => cas.coordinates.x == x && cas.coordinates.y == y);
    }
}