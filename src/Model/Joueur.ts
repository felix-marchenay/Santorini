import { Pion } from "./Pion";
import { Scene, Vector3 } from "babylonjs";
import { infosJoueur } from "../InfosJoueur";
import { Case } from "./Case";
import { Container } from "../Container";
import { Jeu } from "./Jeu";
import { Steppable } from "../Infrastructure/Steppable";
import { Divinite } from "./Divinite/Divinite";
import { DiviniteFactory } from "./Divinite/DiviniteFactory";
import { TypeJoueur } from "./TypeJoueur";

export class Joueur
{
    private pions: Array<Pion>;
    public dernierPionDéplacé: Pion | null = null;
    public readonly id: string;

    constructor (
        public name: string,
        order: number,
        scene: Scene,
        public readonly divinite: Divinite,
        public readonly type: TypeJoueur,
        id?: string,
    ) {
        if (id === undefined) {
            id = Math.random().toString(36).substring(2, 15);
        }
        this.id = id;
        
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
        return new Joueur(
            infos.name,
            infos.order,
            scene,
            DiviniteFactory.build(infos.divinite),
            TypeJoueur[infos.type]
        );
    }

    public aLePion(pion: Pion): Pion | null {
        const pionTrouve = this.pions.find(p => p === pion);

        if (pionTrouve === undefined) {
            return null;
        }

        return pion;
    }

    public posePion (pion: Pion, caze: Case): void {
        if (!this.aLePion(pion)) {
            throw "Pion d'un autre joueur";
        }
        
        caze.poser(pion);
        this.dernierPionDéplacé = pion;
    }

    public getPreparationStep(jeu: Jeu): Steppable {
        if (this.type === TypeJoueur.ia) {
            // return new 
        }
        return this.divinite.getPreparationStep(jeu, this);
    }

    public getDeplacementStep(jeu: Jeu): Steppable {
        return this.divinite.getDeplacementStep(jeu, this);
    }

    public getConstructionStep(jeu: Jeu): Steppable {
        return this.divinite.getConstructionStep(jeu, this);
    }

    autoriseDeplacement (pion: Pion, caze: Case): boolean {
        pion; caze;
        return true;
    }
}