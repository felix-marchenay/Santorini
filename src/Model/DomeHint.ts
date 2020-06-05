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
        
        const position = caze.positionPosePion;
        this.mesh.position.set(position.x, caze.y - 0.08, position.z);

        this.mesh.visibility = .3;

        this.mesh.renderOverlay = true;
        this.mesh.overlayColor.r = 0.38;
        this.mesh.overlayColor.g = 0.56;
        this.mesh.overlayColor.b = 0.79;
        this.enableClickable();
    }

    public readonly estUnDome = true;
}