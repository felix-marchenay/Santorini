import { NullEngine, Scene } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Container } from "../src/Container";
import { Stepper } from "../src/Infrastructure/Stepper";
import { Preparation } from "../src/Steps/Preparation/Preparation";
import { Jeu } from "../src/Model/Jeu";
import { FakeInterface } from "./Mocks/FakeInterface";
import { Joueur } from "../src/Model/Joueur";
import { No } from "../src/Model/Divinite/No";
import { TypeJoueur } from "../src/Model/TypeJoueur";
import { PreparationIA } from "../src/Steps/Preparation/PreparationIA";
import { Case } from "../src/Model/Case";

describe("Construction", () => {
    describe("Création", () => {
        
        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));
        
        let joueur = new Joueur("a", 1, scene, new No, TypeJoueur.humain);
        let joueur2 = new Joueur("bc", 2, scene, new No, TypeJoueur.humain);

        let jeu = new Jeu(
            scene,
            new FakeInterface,
            []
        );

        let stepper = new Stepper;
        stepper.addSteps(
            new Preparation(jeu, joueur),
            new Preparation(jeu, joueur2),
        );

        it ("se déplace", () => {

            stepper.run();

            joueur.allPions[0].emit('click');
            jeu.plateau.allCases[2].emit('click', jeu.plateau.allCases[2]);

            joueur.allPions[1].emit('click');
            jeu.plateau.allCases[3].emit('click', jeu.plateau.allCases[3]);

            expect(joueur.allPions[0].case).toBe(jeu.plateau.allCases[2]);
            expect(joueur.allPions[1].case).toBe(jeu.plateau.allCases[3]);
        });

        it ("IA se prépare", async () => {

            const ia = new Joueur("roboto", 1, scene, new No, TypeJoueur.ia);

            stepper = new Stepper([new PreparationIA(jeu, ia)]);

            await stepper.run();

            expect(ia.allPions[0].case).toBeInstanceOf(Case);
            expect(ia.allPions[1].case).toBeInstanceOf(Case);
        });

    });
});