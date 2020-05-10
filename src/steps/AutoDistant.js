import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Color3 } from "babylonjs";
import { Pan } from "../divinite/Pan";
import { Athena } from "../divinite/Athena";
import { Atlas } from "../divinite/Atlas";
import { Poseidon } from "../divinite/Poseidon";

export class AutoDistant extends Step
{
    run () {
        return super.run(resolve => {
            this.game.setPlayers(
                new Joueur(1, 'Albert-' + Math.floor((Math.random() * 100)), this.game.couleursJoueur[0], new Atlas, this.game.scene, this.game.couleursHex[0], false),
            );

            console.log('I AM ' + this.game.joueurs[0].name);

            this.game.ihm.initJoueurs(this.game.joueurs);

            resolve();
        });
    }
}
