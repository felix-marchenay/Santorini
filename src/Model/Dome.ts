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
    }

    public readonly estUnDome = true;
}