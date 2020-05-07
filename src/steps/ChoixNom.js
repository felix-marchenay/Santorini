import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Athena } from "../divinite/Athena";
import { Atlas } from "../divinite/Atlas";
import { Pan } from "../divinite/Pan";
import { Divinite } from "../divinite/Divinite";

export class ChoixNoms extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.show('name');
            this.game.ihm.emitter.on('namesPicked', joueurs => {
                console.log(joueurs);
                const filtered = joueurs.filter(joueur => joueur.name.length > 0);

                if (filtered.length < 2) {
                    return;
                }

                filtered.forEach((info, i) => {
                    this.game.joueurs.push(
                        new Joueur(info.name, this.game.couleursJoueur[i], Divinite.fromString(info.divinite))
                    );
                });

                this.game.preparerPions();

                this.game.ihm.hide('name');
                this.game.ihm.initJoueurs(this.game.joueurs);

                resolve();
            });
        });
    }

    after() {
        this.game.ihm.hide('name');
    }
}