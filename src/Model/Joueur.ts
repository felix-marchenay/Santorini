import { Pion } from "./Pion";
import { Scene, Vector3 } from "babylonjs";
import { infosJoueur } from "../InfosJoueur";
import { Case } from "./Case";
import { Container } from "../Container";
import { Preparation } from "../Steps/Preparation";
import { Jeu } from "./Jeu";
import { Deplacement } from "../Steps/Deplacement";
import { Construction } from "../Steps/Construction";
import { Steppable } from "../Infrastructure/Steppable";

export class Joueur
{
    private pions: Array<Pion>;
    public dernierPionDéplacé: Pion | null = null;

    constructor (
        public name: string,
        order: number,
        scene: Scene,
        public readonly id?: string
    ) {
        if (this.id === undefined) {
            this.id = Math.random().toString(36).substring(2, 15);
        }
        const materials = [
            Container.loadMaterial('pion-blanc'),
            Container.loadMaterial('pion-bleu'),
            Container.loadMaterial('pion-vert'),
        ];
        this.pions = [
            new Pion(
                scene, 'h',
                new Vector3(-7 + (order * 2) * 2.2, 0, 8.6),
                materials[order-1]
            ),
            new Pion(
                scene, 'f', 
                new Vector3(-7 + ( 1 + order * 2) * 2.2, 0, 8.6),
                materials[order-1]
            ),
        ];
    }

    public get allPions (): Array<Pion> {
        return this.pions;
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
        caze.poser(pion);
        this.dernierPionDéplacé = pion;
    }

    public getPreparationStep(jeu: Jeu): Steppable {
        return new Preparation(jeu, this);
    }

    public getDeplacementStep(jeu: Jeu): Steppable {
        return new Deplacement(jeu, this);
    }

    public getConstructionStep(jeu: Jeu): Steppable {
        return new Construction(jeu, this);
    }

    autoriseDeplacement (pion: Pion, caze: Case): boolean {
        pion; caze;
        return true;
    }
}