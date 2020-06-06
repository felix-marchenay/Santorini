import { Case } from "../src/Model/Case";
import { Scene, NullEngine, Vector3 } from "babylonjs";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Container } from "../src/Container";
import { Pion } from "../src/Model/Pion";
// import { Joueur } from "../src/Model/Joueur";
// import { Jeu } from "../src/Model/Jeu";
// import { FakeInterface } from "./Mocks/FakeInterface";
// import { TypeJoueur } from "../src/Model/TypeJoueur";
// import { No } from "../src/Model/Divinite/No";

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

        it ("build hint", () => {
            let caze = new Case(scene, {x: 2, y: 4});
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

        it ("check état de la case", () => {
            let caze = new Case(scene, {x: 1, y: 4});

            caze.construire();
            caze.construireDome();

            try {
                caze.construire();
            } catch (e) {
                expect(e).toBe("On ne peut pas construire sur une case occupée");
            }

            caze.showBuildHint();

            expect(caze.estComplete).toBe(false);
            expect(caze.aUnDome).toBe(true);
            expect(caze.estOccupée).toBe(true);

            caze = new Case(scene, {x: 1, y: 1});

            caze.construire();
            caze.construire();
            caze.construire();

            caze.showBuildHint();

            expect(caze.estComplete).toBe(false);
            expect(caze.aUnDome).toBe(false);
            expect(caze.estOccupée).toBe(false);
        });
    
        // let joe = new Joueur("Ian", 1, scene, new No, TypeJoueur.ia);
        // const jeu = new Jeu(
        //     scene, new FakeInterface, [joe]
        // );

        // describe("case la plus haute", () => {
        //     joe.allPions[0].déplacerSur(jeu.plateau.getCase(2, 3));
        //     joe.allPions[1].déplacerSur(jeu.plateau.getCase(4, 3));

        //     expect(joe.allPions[0].case).toBeInstanceOf(Case);
        //     expect(joe.allPions[1].case).toBeInstanceOf(Case);

        //     jeu.plateau.getCase(2, 2).construire();
        //     jeu.plateau.getCase(2, 2).construire();

        //     jeu.plateau.getCase(5, 2).construire();
        //     jeu.plateau.getCase(5, 2).construire();
        //     jeu.plateau.getCase(5, 2).construire();

        //     jeu.plateau.getCase(3, 3).construire();
            
        //     jeu.plateau.getCase(1, 4).construire();

        //     jeu.plateau.getCase(5, 4).construire();
        //     jeu.plateau.getCase(5, 4).construire();
        //     jeu.plateau.getCase(5, 4).construire();
        //     jeu.plateau.getCase(5, 4).construire();

        //     //      1   2   3   4   5
        //     //    ---------------------
        //     //  1 |   -   -   -   -   -
        //     //  2 |   - 2 -   -   - 3 -
        //     //  3 |   -P0 - 1 - P1-   -
        //     //  4 | 1 -   -   -   - 4 -
        //     //  5 |   -   -   -   -   -
        //     //    ---------------------
        //     expect(jeu.plateau.casesLaPlusHauteOuPionPeutAller(joe.allPions[0])).toBe(jeu.plateau.getCase(3, 3));
        //     expect(jeu.plateau.casesLaPlusHauteOuPionPeutAller(joe.allPions[1])).toBe(jeu.plateau.getCase(1, 4));
        // });
    });
});