import { Joueur } from "../src/Model/Joueur";
import { Scene, NullEngine } from "babylonjs";
import { Container } from "../src/Container";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Minotaur } from "../src/Model/Divinite/Minotaur";
import { TypeJoueur } from "../src/Model/TypeJoueur";
import { No } from "../src/Model/Divinite/No";
import { Jeu } from "../src/Model/Jeu";
import { FakeInterface } from "./Mocks/FakeInterface";
import { DeplacementMinotaur } from "../src/Steps/Deplacement/DeplacementMinotaur";

describe("Minotaur", () => {
    const scene = new Scene(new NullEngine);
    
    Container.init(new FakeAsetContainer(scene));
    
    let minos = new Joueur("minos", 1, scene, new Minotaur, TypeJoueur.humain);
    let jacques = new Joueur("jacques", 1, scene, new No, TypeJoueur.humain);
    let joueurs = [jacques, minos];
    let jeu = new Jeu(
        scene,
        new FakeInterface,
        joueurs
    );

    test ("deplacement classique", () => {
        jeu.plateau.getCase(1, 2).construire();
        jeu.plateau.getCase(2, 2).construire();

        jeu.plateau.getCase(1, 2).poser(minos.allPions[0]);
        jeu.plateau.getCase(2, 2).poser(minos.allPions[1]);

        jeu.plateau.getCase(3, 1).poser(jacques.allPions[0]);
        jeu.plateau.getCase(2, 3).poser(jacques.allPions[1]);

        let deplacement = new DeplacementMinotaur(jeu, minos);

        const step = deplacement.run().then(() => {
            expect(jeu.plateau.getCase(2, 2).aUnPion).toBe(false);

            expect(jeu.plateau.getCase(2, 3).pion).toBe(minos.allPions[1]);
            expect(jeu.plateau.getCase(2, 4).pion).toBe(jacques.allPions[1]);
        });

        minos.allPions[1].emit('click');

        jeu.plateau.getCase(2, 3).emit('click');

        return step;
    });

    test ("deplacement case suivante hors plateau", () => {

        jeu.reinitialiser();
        
        jeu.plateau.getCase(1, 2).construire();

        jeu.plateau.getCase(1, 2).poser(minos.allPions[0]);
        jeu.plateau.getCase(2, 4).poser(minos.allPions[1]);

        jeu.plateau.getCase(3, 1).poser(jacques.allPions[0]);
        jeu.plateau.getCase(2, 5).poser(jacques.allPions[1]);

        let deplacement = new DeplacementMinotaur(jeu, minos);

        const step = deplacement.run().then(() => {
            expect(jeu.plateau.getCase(2, 5).pion).toBe(jacques.allPions[1]); // pas bougé

            expect(jeu.plateau.getCase(2, 4).pion).toBe(minos.allPions[1]);
            expect(jeu.plateau.getCase(1, 3).pion).toBe(minos.allPions[0]);
            expect(jeu.plateau.getCase(1, 2).aUnPion).toBe(false);
        });

        minos.allPions[1].emit('click');

        jeu.plateau.getCase(2, 5).emit('click'); // rien ne se passe
        
        minos.allPions[0].emit('click');

        jeu.plateau.getCase(1, 3).emit('click');

        return step;
    });
});