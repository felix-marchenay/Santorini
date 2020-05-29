import { ConstructionCollection } from "../src/Model/ConstructionCollection";
import { Etage } from "../src/Model/Etage";
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Dome } from "../src/Model/Dome";
import { Container } from "../src/Container";
import { Case } from "../src/Model/Case";

describe("Construction", () => {

    const scene = new Scene(new NullEngine);
    Container.init(new FakeAsetContainer(scene));
    let caze = new Case(scene, {x:1, y:2});

    let constructions = new ConstructionCollection;

    describe("Création", () => {
        
        constructions.add(
            new Etage(scene, "1", 1, caze)
        );
        constructions.add(
            new Etage(scene, "2", 2, caze)
        );
        constructions.add(
            new Etage(scene, "3", 3, caze)
        );

        it ("plusieurs Constructions", () => {
            expect(constructions.niveau).toBe(3);
        });

    });

    describe("Avec des dômes", () => {

        let etage1 = new Etage(scene, "1", 1, caze);
        let etage3 = new Etage(scene, "3", 3, caze);
        constructions.add(etage1);
        constructions.add(etage3);
        constructions.add(
            new Etage(scene, "2", 2, caze)
        );
        constructions.add(
            new Dome(scene, caze)
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