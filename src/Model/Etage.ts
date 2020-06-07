import { Construction } from "./Construction";
import { Scene } from "babylonjs";
import { Case } from "./Case";

export class Etage extends Construction
{
    constructor (
        scene: Scene,
        niveau: number,
        caze: Case,
    ) {
        super(scene, 'etage-' + niveau, niveau, caze);
    }

    public readonly estUnDome = false;
}