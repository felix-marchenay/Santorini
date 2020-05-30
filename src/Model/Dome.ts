import { Construction } from "./Construction";
import { Case } from "./Case";
import { Scene } from "babylonjs";

export class Dome extends Construction
{
    constructor (
        scene: Scene,
        caze: Case,
        niveau: number
    ) {
        super(scene, 'etage-dome', niveau, caze);

        const position = caze.positionPosePion;
        this.mesh.position.set(position.x, caze.y - 0.08, position.z);
        this.animateBuild();
    }

    public readonly estUnDome = true;
}