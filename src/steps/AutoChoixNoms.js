import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Color3 } from "babylonjs";
import { Pan } from "../divinite/Pan";
import { Athena } from "../divinite/Athena";

export class AutoChoixNoms extends Step
{    
    run () {
        return super.run(resolve => {
            this.game.setPlayers(
                new Joueur('Michel', this.game.couleursJoueur[0], new Pan),
                new Joueur('Edouard', this.game.couleursJoueur[1], new Athena) 
            );
            this.game.preparerPions();

            resolve();
        });
    }
}