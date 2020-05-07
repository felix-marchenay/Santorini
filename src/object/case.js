import { MeshBuilder, StandardMaterial, Color3, Vector3 } from "@babylonjs/core";
import { Etage1 } from "./etage/Etage1";
import { Etage2 } from "./etage/Etage2";
import { Etage3 } from "./etage/Etage3";
import { Dome } from "./etage/Dome";
import { BuildHint } from "./BuildHint";
import { Emitter } from "../infrastructure/emitter";
import { Etage } from "./etage/Etage";
import { HighlightLayer } from "babylonjs";
import { MoveHint } from "./MoveHint";

export class Case
{
    constructor (scene, x, y) {
        this.coordinates = {x, y};
        this.emitter = new Emitter;
        this.scene = scene;
        this.mesh = scene.container.meshes.find(mesh => mesh.id == 'case').clone();
        this.pion = null;

        this.mesh.position = new Vector3(3.1 * x - 6.2, 0, 3.1 * y - 6.2);

        this.mesh.receiveShadows = true;
        this.constructions = {etage1: null, etage2: null, etage3: null, dome: null};
        this.mesh.pointerPicked = () => {
            this.emitter.emit('pointerPicked');
        }
        this.buildHint = new BuildHint(scene, this);
        this.buildHint.emitter.on('pointerPicked', () => {
            this.emitter.emit('pointerPicked');
        });
        this.moveHint = new MoveHint(scene, this);
    }

    poserPion(pion) {
        if (this.dernierEtage()) {
            if (this.dernierEtage().niveau == 'dome') {
                throw "Impossible de se déplacer sur un dome";
            }
        }
        if (pion.case) {
            if (this.differenceNiveau(pion.case) > 1) {
                throw "Etage trop haut pour y monter";
            }
        }
        pion.moveTo(this);
        this.pion = pion;
    }

    differenceNiveau (caze) {
        if (this.dernierEtage()) {
            return this.dernierEtage().difference(caze.dernierEtage());
        }

        if (caze === null) {
            return 0;
        }

        if (caze.dernierEtage() === null) {
            return 0;
        }

        return - (caze.dernierEtage().difference(null));
    }

    liberer() {
        this.pion = null;
    }

    showBuildHint() {
        try {
            this.buildHint.show(this.nextLevelToBuild());
        } catch (e) {
            console.log(e);
        }
    }

    isBuildable() {
        return this.pion == null && !this.hasDome();
    }

    showMoveHint() {
        this.moveHint.on();
    }

    hideMoveHint() {
        this.moveHint.off();
    }

    nextLevelToBuild() {
        return this.dernierEtage() !== null ? this.dernierEtage().nextLevel() : Etage.NIVEAU_1;
    }

    hideBuildHint() {
        this.buildHint.hide();
    }

    estAvoisinante(case2) {
        return Math.abs(case2.coordinates.x - this.coordinates.x) <= 1 && Math.abs(case2.coordinates.y - this.coordinates.y) <= 1;
    }

    pick() {
        this.mesh.material.diffuseColor = new Color3(0.4, 0.5, 0.9);
    }

    unpick() {
        this.mesh.material.diffuseColor = new Color3(0.86, 0.8, 0.9);
    }

    build() {
        if (this.constructions.dome) {
            throw "Impossible de construire sur un dome";
        }
        if (this.pion) {
            throw "Impossible de construire ici, un pion est posé";
        }
        this.doBuild();
    }

    zeusBuild() {
        if (this.constructions.dome) {
            throw "Impossible de construire sur un dome";
        }

        this.doBuild();
    }

    doBuild() {
        if (this.constructions.etage1 === null) {
            this.constructions.etage1 = new Etage1(this.scene, this);
            this.constructions.etage1.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked')
            });
        } else if(this.constructions.etage2 === null) {
            this.constructions.etage2 = new Etage2(this.scene, this);
            this.constructions.etage2.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked')
            });
        } else if(this.constructions.etage3 === null) {
            this.constructions.etage3 = new Etage3(this.scene, this);
            this.constructions.etage3.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked')
            });
        } else if(this.constructions.dome === null) {
            this.constructions.dome = new Dome(this.scene, this);
            this.constructions.dome.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked')
            });
        }
    }

    AtlasBuildDome() {
        if (this.constructions.dome !== null) {
            throw "Un dôme est déjà construit";
        }

        this.constructions.dome = new Dome(this.scene, this);
        this.constructions.dome.emitter.on('pointerPicked', () => {
            this.emitter.emit('pointerPicked')
        });
    }

    YHighest() {
        if (this.dernierEtage() === null) {
            return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
        }

        return this.dernierEtage().mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    positionPosePion() {
        const pionPosition = this.mesh.position.clone();
        pionPosition.y = this.YHighest();
        return pionPosition;
    }

    hasDome() {
        return this.constructions.dome !== null;
    }

    niveau() {
        if (this.dernierEtage() == null) {
            return 0;
        }

        if (this.dernierEtage().niveau == Etage.NIVEAU_DOME) {
            return 4;
        }

        return parseInt(this.dernierEtage().niveau);
    }

    dernierEtage() {
        if (this.constructions.dome !== null) {
            return this.constructions.dome;
        } else if(this.constructions.etage3 !== null) {
            return this.constructions.etage3;
        } else if(this.constructions.etage2 !== null) {
            return this.constructions.etage2;
        } else if(this.constructions.etage1 !== null) {
            return this.constructions.etage1;
        }

        return null;
    }
}