import { MeshBuilder, StandardMaterial, Color3, Vector3 } from "@babylonjs/core";
import { Etage1 } from "./etage/Etage1";
import { Etage2 } from "./etage/Etage2";
import { Etage3 } from "./etage/Etage3";
import { Dome } from "./etage/Dome";
import { BuildHint } from "./BuildHint";
import { Emitter } from "../infrastructure/Emitter";
import { Etage } from "./etage/Etage";
import { HighlightLayer, ExecuteCodeAction, ActionManager } from "babylonjs";

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
        this.mesh.material = this.mesh.material.clone();
        this.initialEmissive = this.mesh.material.emissiveColor.clone();
        this.buildHint = new BuildHint(scene, this);
        this.buildHint.emitter.on('pointerPicked', () => {
            this.emitter.emit('pointerPicked', this);
        });

        this.highlight = new HighlightLayer('', scene);
        this.mesh.actionManager = new ActionManager(scene);
        this.onHoverAction = new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => {
                this.glow();
            }
        );
        this.onUnhoverAction = new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => {
                this.lightGlow();
            }
        );
        this.onPickAction = new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => {
                this.emitter.emit('pointerPicked', this);
            }
        );
    }

    enableClickable() {
        this.mesh.actionManager.registerAction(this.onHoverAction);
        this.mesh.actionManager.registerAction(this.onUnhoverAction);
        this.mesh.actionManager.registerAction(this.onPickAction);
        this.lightGlow();
    }

    disableClickable() {
        this.mesh.actionManager.unregisterAction(this.onHoverAction);
        this.mesh.actionManager.unregisterAction(this.onUnhoverAction);
        this.mesh.actionManager.unregisterAction(this.onPickAction);
        this.unGlow();
    }

    lightGlow () {
        // this.mesh.material.emissiveColor.r = this.initialEmissive.r + 0.15;
        // this.mesh.material.emissiveColor.g = this.initialEmissive.g + 0.15;
        this.mesh.material.emissiveColor.b = this.initialEmissive.b + 0.25;
    }

    glow () {
        // this.mesh.material.emissiveColor.r = this.initialEmissive.r + 0.25;
        // this.mesh.material.emissiveColor.g = this.initialEmissive.g + 0.25;
        this.mesh.material.emissiveColor.b = this.initialEmissive.b + 0.7;
    }

    unGlow() {
        // this.mesh.material.emissiveColor.r = this.initialEmissive.r;
        // this.mesh.material.emissiveColor.g = this.initialEmissive.g;
        this.mesh.material.emissiveColor.b = this.initialEmissive.b;
    }

    poserPion(pion) {
        if (this.dernierEtage() && this.dernierEtage().niveau == 'dome') {
            throw "Impossible de se déplacer sur un dome";
        }

        if (this.pion !== null) {
            throw "Case occupée";
        }

        if (pion.case) {
            if (this.differenceNiveau(pion.case) > 1) {
                throw "Etage trop haut pour y monter";
            }
        }
        
        pion.moveTo(this);
        this.pion = pion;
    }

    estComplete() {
        return Object.values(this.constructions).filter(e => e !== null).length === 4;
    }

    poserPionForce(pion) {
        if (this.dernierEtage() && this.dernierEtage().niveau == 'dome') {
            throw "Impossible de se déplacer sur un dome";
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

    estDuPerimetre() {
        return this.coordinates.x == 0 || this.coordinates.x == 4 || this.coordinates.y == 4 || this.coordinates.y == 0;
    }

    showBuildHint() {
        try {
            this.buildHint.show(this.nextLevelToBuild());
        } catch (e) {
            console.error(e);
        }
    }

    showBuildHintDome() {
        this.buildHint.show(this.nextLevelToBuild() + '-dome');
    }

    isBuildable() {
        return this.pion == null && !this.hasDome();
    }

    nextLevelToBuild() {
        return this.dernierEtage() !== null ? this.dernierEtage().nextLevel() : Etage.NIVEAU_1;
    }

    hideBuildHint() {
        this.buildHint.hide();
    }

    distanceDe(case2) {
        return Math.max(
            Math.abs(case2.coordinates.x - this.coordinates.x),
            Math.abs(case2.coordinates.y - this.coordinates.y)
        );
    }

    estAvoisinante(case2) {
        return this.distanceDe(case2) === 1;
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
        this.doBuild();
    }

    doBuild() {
        if (this.constructions.etage1 === null) {
            this.constructions.etage1 = new Etage1(this.scene, this);
            this.constructions.etage1.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked', this)
            });
        } else if(this.constructions.etage2 === null) {
            this.constructions.etage2 = new Etage2(this.scene, this);
            this.constructions.etage2.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked', this)
            });
        } else if(this.constructions.etage3 === null) {
            this.constructions.etage3 = new Etage3(this.scene, this);
            this.constructions.etage3.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked', this)
            });
        } else if(this.constructions.dome === null) {
            this.constructions.dome = new Dome(this.scene, this);
            this.constructions.dome.emitter.on('pointerPicked', () => {
                this.emitter.emit('pointerPicked', this)
            });
        }
    }

    AtlasBuildDome() {
        if (this.constructions.dome !== null) {
            throw "Un dôme est déjà construit";
        }

        this.constructions.dome = new Dome(this.scene, this);
        this.constructions.dome.emitter.on('pointerPicked', () => {
            this.emitter.emit('pointerPicked', this)
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

    dispose() {
        Object.keys(this.constructions).forEach(key => {
            if (this.constructions[key]) {
                this.constructions[key].mesh.dispose();
            }

            this.constructions[key] = null;
        });
    }

    export() {
        return this.coordinates;
    }
}