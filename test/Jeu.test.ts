import { Jeu } from "../src/Model/Jeu";
import { Scene, NullEngine } from "babylonjs";
import { Emitter } from "../src/Infrastructure/Emitter/Emitter";
import { Plateau } from "../src/Model/Plateau";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Case } from "../src/Model/Case";
import { Container } from "../src/Container";

describe("Ce bon vieu jeu", () => {
    describe("Création instance", () => {

        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));

        let jeu = new Jeu(
            scene,
            new Emitter,
            []
        );

        it ("doit avoir la bonne classe", () => {
            expect(jeu).toBeInstanceOf(Jeu);
            expect(jeu.plateau).toBeInstanceOf(Plateau);
        });
    });

    describe("Construction du plateau", () => {
        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));

        let jeu = new Jeu(
            scene,
            new Emitter,
            []
        );

        it ("Doit bien avoir les cases et le plateau", () => {
            expect(jeu.plateau.cases.length).toBe(25);
            jeu.plateau.cases.all.forEach(caze => {
                expect(caze).toBeInstanceOf(Case);
            });
        });
    });
});
