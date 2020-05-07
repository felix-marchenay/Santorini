import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Color3 } from "babylonjs";
import { Pan } from "../divinite/Pan";
import { Athena } from "../divinite/Athena";
import { Atlas } from "../divinite/Atlas";

export class AutoChoixNoms extends Step
{    
    run () {
        return super.run(resolve => {
            this.game.setPlayers(
                new Joueur('Edouard', this.game.couleursJoueur[1], new Atlas),
                new Joueur('Michel', this.game.couleursJoueur[0], new Pan),
            );
            this.game.preparerPions();

            this.game.ihm.initJoueurs(this.game.joueurs);

            resolve();
        });
    }
}