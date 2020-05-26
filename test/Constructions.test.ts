import { ConstructionCollection } from "../src/Model/ConstructionCollection";
import { Etage } from "../src/Model/Etage";
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Dome } from "../src/Model/Dome";

describe("Construction", () => {
    describe("Création", () => {
        
        const scene = new Scene(new NullEngine);
        const container = new FakeAsetContainer(scene);

        let constructions = new ConstructionCollection;

        constructions.add(
            new Etage(scene, container, "1", 1)
        );
        constructions.add(
            new Etage(scene, container, "2", 2)
        );
        constructions.add(
            new Etage(scene, container, "3", 3)
        );

        it ("plusieurs Constructions", () => {
            expect(constructions.niveau).toBe(3);
        });

    });

    describe("Avec des dômes", () => {
        
        const scene = new Scene(new NullEngine);
        const container = new FakeAsetContainer(scene);

        let constructions = new ConstructionCollection;

        constructions.add(
            new Etage(scene, container, "1", 1)
        );
        constructions.add(
            new Etage(scene, container, "2", 2)
        );
        constructions.add(
            new Etage(scene, container, "3", 3)
        );
        constructions.add(
            new Dome(scene, container)
        );

        it ("plusieurs Constructions", () => {
            expect(constructions.niveau).toBe(4);
        });

    });
});