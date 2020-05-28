import { ConstructionCollection } from "../src/Model/ConstructionCollection";
import { Etage } from "../src/Model/Etage";
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Dome } from "../src/Model/Dome";
import { Container } from "../src/Container";

describe("Construction", () => {
    describe("Création", () => {
        
        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));

        let constructions = new ConstructionCollection;

        constructions.add(
            new Etage(scene, "1", 1)
        );
        constructions.add(
            new Etage(scene, "2", 2)
        );
        constructions.add(
            new Etage(scene, "3", 3)
        );

        it ("plusieurs Constructions", () => {
            expect(constructions.niveau).toBe(3);
        });

    });

    describe("Avec des dômes", () => {
        
        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));

        let constructions = new ConstructionCollection;

        let etage1 = new Etage(scene, "1", 1);
        let etage3 = new Etage(scene, "3", 3);
        constructions.add(etage1);
        constructions.add(etage3);
        constructions.add(
            new Etage(scene, "2", 2)
        );
        constructions.add(
            new Dome(scene)
        );

        it ("doit renvoyer le plus haut niveau", () => {
            expect(constructions.niveau).toBe(4);
        });

        it ("doit renvoyer le dernier dome", () => {
            expect(constructions.dernierEtage?.niveau).toBe(4);
        });

        it ("doit montrer l'étage suivant", () => {
            expect(etage1.prochainNiveau).toBe(2);
        });

        it ("doit montrer la différence de niveau", () => {
            expect(etage3.differenceDeNiveauAvec(etage1)).toBe(-2);
        });
    });
});