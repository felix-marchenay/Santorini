import { Construction } from "./Construction";
import { Scene } from "babylonjs";
import { Case } from "./Case";

export class EtageHint extends Construction
{
    constructor (
        scene: Scene,
        niveau: number,
        caze: Case,
    ) {
        super(scene, 'etage-' + niveau, niveau, caze);

        this.mesh.visibility = .3;

        this.mesh.renderOverlay = true;
        this.mesh.overlayColor.r = 0.38;
        this.mesh.overlayColor.g = 0.56;
        this.mesh.overlayColor.b = 0.79;
        this.enableClickable();
    }

    public readonly estUnDome = false;
}