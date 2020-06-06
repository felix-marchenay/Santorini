import { Joueur } from "../src/Model/Joueur";
import { Scene, NullEngine } from "babylonjs";
import { Atlas } from "../src/Model/Divinite/Atlas";
import { Triton } from "../src/Model/Divinite/Triton";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Container } from "../src/Container";
import { No } from "../src/Model/Divinite/No";
import { Jeu } from "../src/Model/Jeu";
import { FakeInterface } from "./Mocks/FakeInterface";
import { Construction } from "../src/Steps/Construction";
import { Deplacement } from "../src/Steps/Deplacement";
import { Preparation } from "../src/Steps/Preparation";
import { ConstructionAtlas } from "../src/Steps/ConstructionAtlas";
import { DeplacementTriton } from "../src/Steps/DeplacementTriton";

describe("Joueurs", () => {

    describe("Test des joueurs", () => {

        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));
        let joueurs = [
            new Joueur("adrian", 1, scene, new Atlas),
            new Joueur("richard", 2, scene, new Triton)
        ];
        
        let jeu = new Jeu(
            scene,
            new FakeInterface,
            joueurs
        );

        it("Création de base", () => {
            expect(joueurs[0].divinite.name).toBe('Atlas');
            expect(joueurs[1].divinite.name).toBe('Triton');
            expect(joueurs[0].dernierPionDéplacé).toBe(null);
        });

        it ("a des pions", () => {
            expect(joueurs[0].allPions).toBeInstanceOf(Array);
            expect(joueurs[1].allPions).toBeInstanceOf(Array);
        });

        it ("construction depuis des infos", () => {
            let joueur = Joueur.fromInfos({
                name: 'Albertinho',
                divinite: 'no',
                order: 1
            }, scene);

            expect(joueur).toBeInstanceOf(Joueur);
            expect(joueur.name).toBe('Albertinho');
            expect(joueur.divinite).toBeInstanceOf(No);
        });

        it ("déroulement des hautes steps", () => {
            let construction = joueurs[0].getConstructionStep(jeu);
            let deplacement = joueurs[0].getDeplacementStep(jeu);
            let preparation = joueurs[0].getPreparationStep(jeu);

            expect(construction).toBeInstanceOf(ConstructionAtlas);
            expect(deplacement).toBeInstanceOf(Deplacement);
            expect(preparation).toBeInstanceOf(Preparation);

            expect(joueurs[1].getConstructionStep(jeu)).toBeInstanceOf(Construction);
            expect(joueurs[1].getDeplacementStep(jeu)).toBeInstanceOf(DeplacementTriton);
            expect(joueurs[1].getPreparationStep(jeu)).toBeInstanceOf(Preparation);
        });
    });
});