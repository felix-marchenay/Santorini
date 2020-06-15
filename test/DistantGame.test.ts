import { Scene, NullEngine } from "babylonjs";
import { Container } from "../src/Container";
import { FakeAsetContainer } from "./Mocks/AssetContainer.mock";
import { Jeu } from "../src/Model/Jeu";
import { FakeInterface } from "./Mocks/FakeInterface";
import { FakeServer } from "./Mocks/FakeServer";
import { Joueur } from "../src/Model/Joueur";
import { No } from "../src/Model/Divinite/No";
import { TypeJoueur } from "../src/Model/TypeJoueur";
import { PreparationDistant } from "../src/Steps/Preparation/PreparationDistant";
import { DeplacementDistant } from "../src/Steps/Deplacement/DeplacementDistant";
import { ConstructionDistant } from "../src/Steps/Construction/ConstructionDistant";

describe ("Jeu en ligne", () => {
    
    const scene = new Scene(new NullEngine);
    Container.init(new FakeAsetContainer(scene));

    const joeLoc = new Joueur("Joe local", 1, scene, new No, TypeJoueur.humain, "15", ['a1', 'b2']);
    const joeDist = new Joueur("Joe distant", 2, scene, new No, TypeJoueur.distant, "19", ['c1', 'c2']);

    let jeu = new Jeu(
        scene,
        new FakeInterface,
        [joeDist, joeLoc],
        new FakeServer
    );
    
    it ("préparation", async () => {

        let preparation = new PreparationDistant(jeu, joeDist);
        
        expect(joeDist.allPions[0].id).toBe('c1');
        expect(joeDist.allPions[1].id).toBe('c2');
        
        const prep = preparation.run().then(() => {
            const case1 = joeDist.allPions[0].case;
            const case2 = joeDist.allPions[1].case;

            expect(case1?.coordonnees.x).toBe(2);
            expect(case1?.coordonnees.y).toBe(1);

            expect(case2?.coordonnees.x).toBe(1);
            expect(case2?.coordonnees.y).toBe(4);
        });

        jeu.server?.emit('deplacerPion', {
            data: {
                id: 'c1',
                position: {x: 2, y: 1}
            },
            joueur: '19'
        });

        jeu.server?.emit('deplacerPion', {
            data: {
                id: 'c2',
                position: {x: 1, y: 4}
            },
            joueur: '19'
        });

        return prep;
    });

    test ("deplacement", () => {
        const deplacement = new DeplacementDistant(jeu, joeDist);

        const dep = deplacement.run().then(() => {
            const case1 = joeDist.allPions[0].case;
            const case2 = joeDist.allPions[1].case;

            expect(case1?.coordonnees.x).toBe(2);
            expect(case1?.coordonnees.y).toBe(1);

            expect(case2?.coordonnees.x).toBe(4);
            expect(case2?.coordonnees.y).toBe(4);
        });

        jeu.server?.emit('deplacerPion', {
            data: {
                id: 'c2',
                position: {x: 4, y: 4}
            },
            joueur: '19'
        });

        jeu.server?.emit('endTurn');

        return dep;
    });

    test ("construction", () => {
        const construction = new ConstructionDistant(jeu, joeDist);

        const cons = construction.run().then(() => {
            expect(jeu.plateau.getCase(2, 4).niveau).toBe(2);
            expect(jeu.plateau.getCase(2, 1).niveau).toBe(1);
            expect(jeu.plateau.getCase(1, 1).niveau).toBe(0);
            expect(jeu.plateau.getCase(1, 2).niveau).toBe(0);
        });

        jeu.server?.emit('construire', {x: 2, y: 4});
        jeu.server?.emit('construire', {x: 2, y: 4});
        jeu.server?.emit('construire', {x: 2, y: 1});

        jeu.server?.emit('endTurn');

        return cons;
    });
});