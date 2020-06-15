import { NullEngine, Scene } from "babylonjs";
import { FakeAsetContainer } from "../Mocks/AssetContainer.mock";
import { Container } from "../../src/Container";
import { Joueur } from "../../src/Model/Joueur";
import { Minotaur } from "../../src/Model/Divinite/Minotaur";
import { TypeJoueur } from "../../src/Model/TypeJoueur";
import { Jeu } from "../../src/Model/Jeu";
import { FakeInterface } from "../Mocks/FakeInterface";
import { Apollon } from "../../src/Model/Divinite/Apollon";
import { DeplacementApollon } from "../../src/Steps/Deplacement/DeplacementApollon";

describe("Minotaur", () => {
    const scene = new Scene(new NullEngine);
    
    Container.init(new FakeAsetContainer(scene));
    
    let minos = new Joueur("minos", 1, scene, new Minotaur, TypeJoueur.humain);
    let polo = new Joueur("popoml", 1, scene, new Apollon, TypeJoueur.humain);
    let joueurs = [polo, minos];
    let jeu = new Jeu(
        scene,
        new FakeInterface,
        joueurs
    );

    test ("deplacement apollon", () => {
        jeu.plateau.getCase(1, 2).construire();
        jeu.plateau.getCase(2, 2).construire();

        jeu.plateau.getCase(1, 2).poser(minos.allPions[0]);
        jeu.plateau.getCase(2, 2).poser(minos.allPions[1]);

        jeu.plateau.getCase(3, 1).poser(polo.allPions[0]);
        jeu.plateau.getCase(2, 3).poser(polo.allPions[1]);

        let deplacement = new DeplacementApollon(jeu, polo);

        const step = deplacement.run().then(() => {
            expect(jeu.plateau.getCase(2, 2).aUnPion).toBe(true);
            expect(jeu.plateau.getCase(2, 3).aUnPion).toBe(true);

            expect(jeu.plateau.getCase(2, 3).pion).toBe(minos.allPions[1]);
            expect(jeu.plateau.getCase(2, 2).pion).toBe(polo.allPions[1]);
        });

        polo.allPions[1].emit('click');

        jeu.plateau.getCase(2, 2).emit('click');

        return step;
    });

    test ("deplacement normal sans échange", () => {
        jeu.plateau.getCase(3, 2).poser(minos.allPions[0]);
        jeu.plateau.getCase(3, 3).poser(minos.allPions[1]);

        jeu.plateau.getCase(4, 2).poser(polo.allPions[0]);
        jeu.plateau.getCase(1, 1).poser(polo.allPions[1]);

        let deplacement = new DeplacementApollon(jeu, polo);

        const step = deplacement.run().then(() => {
            expect(jeu.plateau.getCase(4, 3).aUnPion).toBe(true);
            expect(jeu.plateau.getCase(4, 2).aUnPion).toBe(false);

            expect(jeu.plateau.getCase(4, 3).pion).toBe(polo.allPions[0]);
        });

        polo.allPions[0].emit('click');

        jeu.plateau.getCase(4, 3).emit('click');

        return step;
    });
});