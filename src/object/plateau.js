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
        this.cases = this.genererCases();
        this.board = this.createBoard();
        this.casePicked = null;
    }

    genererCases () {
        const cases = [];
        for (let x = 0; x < this.nbCases[0]; x++) {
            if (!cases[x]) {
                cases[x] = [];
            }
            for (let y = 0; y < this.nbCases[1]; y++) {
                cases[x][y] = new Case(
                    this.scene, 
                    x, 
                    y, 
                    this.dimensions.w / this.nbCases[1],
                    this.dimensions.d / this.nbCases[0],
                    0.2
                );
            }
        }
        return cases;
    }

    createBoard() {
        const boardMesh = MeshBuilder.CreateBox("", {
            width: this.dimensions.w,
            height: this.dimensions.h,
            depth: this.dimensions.d
        });
        return boardMesh;
    }

    casesAvoisinantes(caseA) {
        return this.allCases().filter(caseB => caseB.estAvoisinante(caseA) && caseB != caseA);
    }

    showBuildHintAround (caze) {
        this.showBuildHint(
            this.casesAvoisinantes(caze)
        );
    }
    
    showBuildHint (cases) {
        cases.map(cas => cas.showBuildHint());
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