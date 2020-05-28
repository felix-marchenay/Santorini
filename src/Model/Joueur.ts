import { Pion } from "./Pion";
import { Scene, Vector3 } from "babylonjs";
import { infosJoueur } from "../InfosJoueur";
import { Case } from "./Case";
import { Container } from "../Container";

export class Joueur
{
    private pions: Array<Pion>;
    public dernierPionDéplacé: Pion | null = null;

    constructor (
        public name: string,
        order: number,
        scene: Scene
    ) {
        const materials = [
            Container.loadMaterial('pion-blanc'),
            Container.loadMaterial('pion-bleu'),
            Container.loadMaterial('pion-vert'),
        ];
        this.pions = [
            new Pion(
                scene, 'h',
                new Vector3(-7 + (order * 2) * 2.2, 0, 8.6),
                materials[order]
            ),
            new Pion(
                scene, 'f', 
                new Vector3(-7 + ( 1 + order * 2) * 2.2, 0, 8.6),
                materials[order]
            ),
        ];
    }

    public static fromInfos(infos: infosJoueur, scene: Scene): Joueur
    {
        return new Joueur(infos.name, infos.order, scene);
    }

    public aLePion(pion: Pion): Pion | null {
        const pionTrouve = this.pions.find(p => p === pion);

        if (pionTrouve === undefined) {
            return null;
        }

        return pion;
    }

    public posePion (pion: Pion, caze: Case): void {
        pion.déplacerSur(caze);
        this.dernierPionDéplacé = pion;
    }
}