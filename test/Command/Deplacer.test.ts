import { CommandBus } from "../../src/Infrastructure/Command"
import { Scene, NullEngine } from "babylonjs";
import { FakeAsetContainer } from "../Mocks/AssetContainer.mock";
import { Container } from "../../src/Container";
import { FakeInterface } from "../Mocks/FakeInterface";
import { Jeu } from "../../src/Model/Jeu";
import { DéplacerPion } from "../../src/Command/DéplacerPion";
import { TypeJoueur } from "../../src/Model/TypeJoueur";
import { Atlas } from "../../src/Model/Divinite/Atlas";
import { Triton } from "../../src/Model/Divinite/Triton";
import { Joueur } from "../../src/Model/Joueur";

describe("Command déplacement", () => {
    
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

    test ("Déplace", () => {
        bus.execute(
            new DéplacerPion(adrian.allPions[0], jeu.plateau.getCase(1, 3), adrian, jeu),
            new DéplacerPion(adrian.allPions[1], jeu.plateau.getCase(1, 4), adrian, jeu)
        );

        expect(adrian.allPions[0].case?.coordonnees).toStrictEqual({x: 1, y: 3});
        expect(adrian.allPions[1].case?.coordonnees).toStrictEqual({x: 1, y: 4});
    });
})