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
            new Etage(scene, 1, caze)
        );
        constructions.add(
            new Etage(scene, 2, caze)
        );
        constructions.add(
            new Etage(scene, 3, caze)
        );

        it ("plusieurs Constructions", () => {
            expect(constructions.niveau).toBe(3);
        });
    });

    describe("Avec des dômes", () => {

        let constructions = new ConstructionCollection;

        let etage2 = new Etage(scene, 2, caze);
        let etage3 = new Etage(scene, 3, caze);
        constructions.add(new Etage(scene, 1, caze));
        constructions.add(etage2);
        constructions.add(etage3);
        constructions.add(new Dome(scene, caze, 4));

        it ("doit renvoyer le plus haut niveau", () => {
            expect(constructions.niveau).toBe(4);
        });

        it ("doit renvoyer le dernier dome", () => {
            expect(constructions.dernierEtage?.niveau).toBe(4);
        });

        it ("doit montrer l'étage suivant", () => {
            expect(etage2.prochainNiveau).toBe(3);
        });

        it ("doit montrer la différence de niveau", () => {
            expect(etage3.differenceDeNiveauAvec(etage2)).toBe(-1);
        });
    });

    describe("Destruction", () => {
        let constructions = new ConstructionCollection;

        constructions.add(new Etage(scene, 1, caze));
        constructions.add(new Etage(scene, 2, caze));

        it ("détruit normalement", () => {
            expect(constructions.niveau).toBe(2);

            constructions.removeLast();

            expect(constructions.niveau).toBe(1);
        });
    });

    describe("Respect des règles de constructions", () => {
        it("Doit pas $etre possible de construire sur un dôme", () => {
            let constructions = new ConstructionCollection;
    
            try {
                constructions.add(new Dome(scene, caze, 1));
                constructions.add(new Etage(scene, 2, caze));
            } catch (e) {
                expect(e).toBe('Impossible de construire sur un dôme');
            }
        });
    
        it("Doit respecter l'ordre", () => {
            let constructions = new ConstructionCollection;
    
            try {
                constructions.add(new Dome(scene, caze, 1));
                constructions.add(new Dome(scene, caze, 3));
            } catch (e) {
                expect(e).toBe("Il faut construire dans l'ordre");
            }
        });
    
        it("Doit respecter l'ordre commencer par un etage 1", () => {
            let constructions = new ConstructionCollection;
    
            try {
                constructions.add(new Dome(scene, caze, 3));
            } catch (e) {
                expect(e).toBe("Il faut construire un etage 1 en premier");
            }
        });
    });
});