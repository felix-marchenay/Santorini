import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Color3 } from "babylonjs";

export class AutoChoixNoms extends Step
{    
    run () {
        return super.run(resolve => {
            this.game.setPlayers(
                new Joueur('Michel', this.game.couleursJoueur[0]),
                new Joueur('Edouard', this.game.couleursJoueur[1]) 
            );
            this.game.preparerPions();

            resolve();
        });
    }
}