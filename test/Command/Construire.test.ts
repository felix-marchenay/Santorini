import { CommandBus } from "../../src/Infrastructure/Command"
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "../Mocks/AssetContainer.mock";
import { Container } from "../../src/Container";
import { FakeInterface } from "../Mocks/FakeInterface";
import { Jeu } from "../../src/Model/Jeu";
import { TypeJoueur } from "../../src/Model/TypeJoueur";
import { Atlas } from "../../src/Model/Divinite/Atlas";
import { Triton } from "../../src/Model/Divinite/Triton";
import { Joueur } from "../../src/Model/Joueur";
import { Construire } from "../../src/Command/Construire";
import { ConstruireSousLePion } from "../../src/Command/ConstruireSousLePion";

describe("Command construction", () => {
    
    const bus = new CommandBus;
    
    const scene = new Scene(new NullEngine);
    Container.init(new FakeAsetContainer(scene));

    const adrian = new Joueur("adrian", 1, scene, new Atlas, TypeJoueur.humain);
    const richard = new Joueur("richard", 2, scene, new Triton, TypeJoueur.humain);
    let joueurs = [adrian, richard];
    
    let jeu = new Jeu(
        scene,
        new FakeInterface,
        joueurs
    );

    test ("construit", () => {
        bus.execute(
            new Construire(jeu, jeu.plateau.getCase(4, 5)),
            new Construire(jeu, jeu.plateau.getCase(1, 1)),
            new Construire(jeu, jeu.plateau.getCase(1, 1)),
            new Construire(jeu, jeu.plateau.getCase(1, 1)),
            new Construire(jeu, jeu.plateau.getCase(2, 4)),
        );

        expect(jeu.plateau.getCase(4, 5).niveau).toBe(1);
        expect(jeu.plateau.getCase(1, 1).niveau).toBe(3);
        expect(jeu.plateau.getCase(2, 4).niveau).toBe(1);
    });

    test ("construit sous le pion", () => {

        bus.execute(
            new ConstruireSousLePion(jeu, jeu.plateau.getCase(4, 5)),
        );

        expect(jeu.plateau.getCase(4, 5).niveau).toBe(2);
    });
})