import { Jeu } from "../src/Model/Jeu";
import { Scene, NullEngine } from "babylonjs";
import { Emitter } from "../src/Infrastructure/Emitter/Emitter";
import { Plateau } from "../src/Model/Plateau";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";

describe("Ce bon vieu jeu", () => {
    describe("Création instance", () => {
        it ("doit avoir la bonne classe", () => {
            const scene = new Scene(new NullEngine);
            const container = new FakeAsetContainer(scene);
    
            let jeu = new Jeu(
                scene,
                container,
                new Emitter,
                []
            );
    
            expect(jeu).toBeInstanceOf(Jeu);
            expect(jeu.plateau).toBeInstanceOf(Plateau);
        });

        it ("doit avoir la bonne classe", () => {
            const scene = new Scene(new NullEngine);
            const container = new FakeAsetContainer(scene);
    
            let jeu = new Jeu(
                scene,
                container,
                new Emitter,
                []
            );
    
            expect(jeu).toBeInstanceOf(Jeu);
            expect(jeu.plateau).toBeInstanceOf(Plateau);
        });
    });
});
