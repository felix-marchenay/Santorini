import { Case } from "../src/Model/Case";
import { Scene, NullEngine, Vector3 } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Container } from "../src/Container";
import { Pion } from "../src/Model/Pion";

describe("Cases", () => {
    describe("Création", () => {
        const scene = new Scene(new NullEngine);
        Container.init(new FakeAsetContainer(scene));

        let cases = [
            new Case(scene, {x: 1, y: 4}),
            new Case(scene, {x: 3, y: 4}),
            new Case(scene, {x: 1, y: 5})
        ];

        let pions = [
            new Pion(scene, 'h', Vector3.Zero(), Container.loadMaterial('pion-blanc')),
            new Pion(scene, 'f', Vector3.Zero(), Container.loadMaterial('pion-blanc')),
        ];

        it ("doivent toutes être au niveau 0", () => {
            expect(cases[0].niveau).toBe(0);
            expect(cases[1].niveau).toBe(0);

            cases[0].lightGlow();
            cases[0].glow();
            cases[0].unGlow();
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

        it ("doit déplacer le pion - enchainement de déplacements", () => {
            expect(pions[0].peutAller(cases[0])).toBe(true);

            cases[0].poser(pions[0]);
            expect(cases[0].estOccupée).toBe(true);
            expect(cases[1].estOccupée).toBe(false);

            cases[1].poser(pions[0]);

            expect(cases[0].estOccupée).toBe(false);
            expect(cases[1].estOccupée).toBe(true);

            cases[0].poser(pions[0]);
            cases[2].poser(pions[0]);

            expect(pions[1].peutAller(cases[0])).toBe(true);
        });

        it ("doit s'animer pour la victoire", () => {
            pions[0].animateVictory();

            expect(pions[0].peutAller(cases[0])).toBe(true);
        });

        it ("doit construire sans emcombre", () => {
            expect(cases[1].niveau).toBe(0);
            expect(cases[1].estOccupée).toBe(false);

            cases[1].construire();
            cases[1].construire();

            expect(cases[0])
        });

        it ("clickables & contruction", () => {
            cases[0].enableClickable(false);
            cases[0].disableClickable();
            
            cases[0].construire();

            expect(cases[0].niveau).toBe(1);

            cases[1].construire();
            cases[1].construire();

            cases[2].construireSousLePion();

            expect(cases[2].estComplete).toBe(false);
            expect(cases[1].estDuPerimetre).toBe(false);
        });

        let caze = new Case(scene, {x: 2, y: 4});

        it ("build hint", () => {
            caze.showBuildHint();

            caze.hideBuildHint();

            caze.construire();
            caze.construire();

            caze.showBuildHint();

            expect(caze.estComplete).toBe(false);

            caze.construire();

            caze.showBuildHintDome();
            
            caze.construire();

            caze.showBuildHint();

            expect(caze.estComplete).toBe(true);
        });
    });
});