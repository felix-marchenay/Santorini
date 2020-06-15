import { Pion } from "../src/Model/Pion";
import { NullEngine, Scene, Vector3, Material } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Container } from "../src/Container";
import { Plateau } from "../src/Model/Plateau";

describe("test des Pions", () => {

    const scene = new Scene(new NullEngine);
    const material = new Material('aze', scene);
    Container.init(new FakeAsetContainer(scene));

    const pion1 = new Pion(scene, "f", Vector3.Zero(), material);
    const pion2 = new Pion(scene, "h", Vector3.Zero(), material);

    const plateau = new Plateau(scene);

    test("déplacement des pions", () => {
        plateau.getCase(1, 5).poser(pion1);
        plateau.getCase(3, 4).poser(pion2);

        expect(plateau.getCase(1, 5).aUnPion).toBe(true);
        expect(plateau.getCase(3, 4).aUnPion).toBe(true);

        expect(plateau.getCase(1, 5).pion).toBe(pion1);
        expect(plateau.getCase(3, 4).pion).toBe(pion2);

        expect(pion1.case).toBe(plateau.getCase(1, 5));
        expect(pion2.case).toBe(plateau.getCase(3, 4));
    });

    test("échange de place", () => {
        pion2.echangerPlace(pion1);

        expect(plateau.getCase(1, 5).aUnPion).toBe(true);
        expect(plateau.getCase(3, 4).aUnPion).toBe(true);

        expect(plateau.getCase(1, 5).pion).toBe(pion2);
        expect(plateau.getCase(3, 4).pion).toBe(pion1);

        expect(pion1.case).toBe(plateau.getCase(3, 4));
        expect(pion2.case).toBe(plateau.getCase(1, 5));
    });
})