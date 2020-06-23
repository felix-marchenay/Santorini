import { Jeu } from "../src/Model/Jeu";
import { Scene, NullEngine, Vector3, Material } from "babylonjs";
import { Plateau } from "../src/Model/Plateau";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Case } from "../src/Model/Case";
import { Container } from "../src/Container";
import { Pion } from "../src/Model/Pion";
import { FakeInterface } from "./Mocks/FakeInterface";
import { Joueur } from "../src/Model/Joueur";
import { No } from "../src/Model/Divinite/No";
import { TypeJoueur } from "../src/Model/TypeJoueur";
import { Minotaur } from "../src/Model/Divinite/Minotaur";

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
            expect(jeu.plateau.allCases.length).toBe(25);
            jeu.plateau.allCases.forEach(caze => {
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

    describe("cases clickables", () => {
        it ("doivent etre clickables", () => {
            let cases = [
                new Case(scene, {x: 2, y: 4}),
                new Case(scene, {x: 2, y: 3})
            ];

            let count = 0;
            jeu.casesClickables(cases, () => {
                count++;
            });

            cases[0].emit('click');
            cases[0].emit('click');
            cases[1].emit('click');

            expect(count).toBe(3);

            jeu.casesUnpickables(cases);

            cases[0].emit('click');
            cases[1].emit('click');

            expect(count).toBe(3);
        });
    });

    describe("Actions de jeu", () => {

        let bernadette = new Joueur("bernadette", 1, scene, new No, TypeJoueur.humain);
        let jacques = new Joueur("jacques", 1, scene, new No, TypeJoueur.humain);
        let joueurs = [bernadette, jacques];
        let jeu = new Jeu(
            scene,
            new FakeInterface,
            joueurs
        );
        
        it ("phase de jeu", () => {

            jeu.poser(bernadette.allPions[0], jeu.plateau.getCase(1, 4), bernadette);

            expect(bernadette.allPions[0].case).toEqual(jeu.plateau.getCase(1, 4));
            jeu.poser(bernadette.allPions[1], jeu.plateau.getCase(2, 5), bernadette);
            jeu.poser(jacques.allPions[0], jeu.plateau.getCase(2, 4), jacques);
            jeu.poser(jacques.allPions[1], jeu.plateau.getCase(4, 2), jacques);

            jeu.plateau.getCase(1, 3).construire();
            jeu.plateau.getCase(1, 3).construire();

            jeu.plateau.getCase(2, 3).construire();
            jeu.plateau.getCase(2, 3).construire();
            jeu.plateau.getCase(2, 3).construire();

            jeu.poser(jacques.allPions[1], jeu.plateau.getCase(2, 3), jacques);

            expect(bernadette.allPions[0].case).toEqual(jeu.plateau.getCase(1, 4));
            expect(bernadette.allPions[1].case).toEqual(jeu.plateau.getCase(2, 5));
            expect(jacques.allPions[0].case).toEqual(jeu.plateau.getCase(2, 4));
        });
    });

    describe("réinitialiser", () => {

        let minos = new Joueur("minos", 1, scene, new Minotaur, TypeJoueur.humain);
        let jacques = new Joueur("jacques", 1, scene, new No, TypeJoueur.humain);
        let joueurs = [jacques, minos];
        let jeu = new Jeu(
            scene,
            new FakeInterface,
            joueurs
        );

        test ("réinitialiser", () => {
            
            jeu.plateau.getCase(1, 2).construire();
            jeu.plateau.getCase(2, 2).construire();

            jeu.plateau.getCase(1, 2).poser(minos.allPions[0]);
            jeu.plateau.getCase(2, 2).poser(minos.allPions[1]);

            jeu.plateau.getCase(3, 1).poser(jacques.allPions[0]);
            jeu.plateau.getCase(2, 3).poser(jacques.allPions[1]);
            
            jeu.plateau.getCase(4, 5).construire();
            jeu.plateau.getCase(4, 5).construire();
            jeu.plateau.getCase(4, 5).construire();
            jeu.plateau.getCase(4, 5).construire();

            expect(jeu.plateau.getCase(4, 5).niveau).toBe(4);
            expect(jeu.plateau.getCase(4, 5).aUnDome).toBe(true);

            expect(jeu.plateau.getCase(1, 2).aUnPion).toBe(true);
            expect(jeu.plateau.getCase(2, 2).aUnPion).toBe(true);

            expect(minos.allPions[0].case?.coordonnees.x).toBe(1);
            expect(minos.allPions[0].case?.coordonnees.y).toBe(2);

            jeu.reinitialiser();

            jeu.plateau.allCases.forEach(c => {
                expect(c.niveau).toBe(0);
                expect(c.pion).toBe(null);
            });

            minos.allPions.forEach(p => {
                expect(p.case).toBe(null);
            });
        });
    });
});
