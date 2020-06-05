import { Construction } from "./Construction";
import { Scene } from "babylonjs";
import { Case } from "./Case";

export class DomeHint extends Construction
{
    constructor (
        scene: Scene,
        niveau: number,
        caze: Case,
    ) {
        super(scene, 'etage-dome', niveau, caze);
        if (this.mesh.material !== null) {
            this.mesh.material.alpha = .2;
        }

        this.mesh.overlayColor.r = 0.176;
        this.mesh.overlayColor.g = 0.380;
        this.mesh.overlayColor.b = 0.631;
        this.mesh.renderOverlay = true;
        this.enableClickable();
    }

    public readonly estUnDome = true;
}