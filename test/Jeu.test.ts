import { Jeu } from "../src/Model/Jeu";
import { Scene, NullEngine, Vector3, Material } from "babylonjs";
import { Plateau } from "../src/Model/Plateau";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Case } from "../src/Model/Case";
import { Container } from "../src/Container";
import { Pion } from "../src/Model/Pion";
import { FakeInterface } from "./Mocks/FakeInterface";

describe("Ce bon vieu jeu", () => {

    const scene = new Scene(new NullEngine);
    const material = new Material('aze', scene);
    Container.init(new FakeAsetContainer(scene));

    let jeu = new Jeu(
        scene,
        new FakeInterface,
        []
    );

    describe("Création instance", () => {

        it ("doit avoir la bonne classe", () => {
            expect(jeu).toBeInstanceOf(Jeu);
            expect(jeu.plateau).toBeInstanceOf(Plateau);
        });
    });

    describe("Construction du plateau", () => {
        it ("Doit bien avoir les cases et le plateau", () => {
            expect(jeu.plateau.cases.length).toBe(25);
            jeu.plateau.cases.all.forEach(caze => {
                expect(caze).toBeInstanceOf(Case);
            });
        });
    });

    describe("Clickableness", () => {
        it ("doit être clickable", () => {
            let pion = new Pion(scene, 'f', Vector3.Zero(), material);

            let count = 0;

            jeu.pionsClickables([pion], (pion: Pion) => {
                pion;
                count++;
            });

            pion.emit('click');

            expect(jeu.pionIdle).toBe(pion);
            expect(count).toBe(1);
        });
    });

    describe("UnClickableness", () => {
        it ("doit plus être clickable", () => {
            let pions = [
                new Pion(scene, 'f', Vector3.Zero(), material),
                new Pion(scene, 'h', Vector3.Zero(), material)
            ];

            let count = 0;

            jeu.pionsClickables(pions, (pion: Pion) => {
                pion;
                count++;
            });

            pions[1].emit('click');
            pions[1].emit('click');

            expect(jeu.pionIdle).toBe(pions[1]);
            expect(count).toBe(2);

            jeu.pionIdle = pions[0];
            expect(jeu.pionIdle).toBe(pions[0]);

            jeu.pionsUnclickables(pions);

            pions[1].emit('click');
            pions[0].emit('click');

            expect(count).toBe(2);
        });
    });
});
