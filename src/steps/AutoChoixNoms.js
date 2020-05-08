import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Color3 } from "babylonjs";
import { Pan } from "../divinite/Pan";
import { Athena } from "../divinite/Athena";
import { Atlas } from "../divinite/Atlas";
import { Poseidon } from "../divinite/Poseidon";

export class AutoChoixNoms extends Step
{    
    run () {
        return super.run(resolve => {
            this.game.setPlayers(
                new Joueur(1, 'Albert', this.game.couleursJoueur[0], new Atlas, this.game.scene),
                new Joueur(2, 'Bertinho', this.game.couleursJoueur[1], new Poseidon, this.game.scene),
            );

            this.game.ihm.initJoueurs(this.game.joueurs);

            resolve();
        });
    }
}