import { Case } from "../src/Model/Case";
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";

describe("Cases", () => {
    describe("Création", () => {
        const scene = new Scene(new NullEngine);
        const container = new FakeAsetContainer(scene);

        let cases = [
            new Case(scene, container, {x: 1, y: 4}),
            new Case(scene, container, {x: 3, y: 4}),
            new Case(scene, container, {x: 1, y: 5})
        ];

        it ("doivent toutes être au niveau 0", () => {
            expect(cases[0].niveau).toBe(0);
            expect(cases[1].niveau).toBe(0);
        });

        it ("doit être avoisinantes", () => {
            expect(cases[0].avoisine(cases[1])).toBe(false);
            expect(cases[0].avoisine(cases[2])).toBe(true);
        });

        it ("doit se montrer du périmetre", () => {
            expect(cases[0].estDuPerimetre).toBe(true);
            expect(cases[1].estDuPerimetre).toBe(false);
            expect(cases[2].estDuPerimetre).toBe(true);
        });
    });
});