import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Athena } from "../divinite/Athena";
import { Atlas } from "../divinite/Atlas";
import { Pan } from "../divinite/Pan";

export class ChoixNoms extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.show('name');
            this.game.ihm.emitter.on('namesPicked', joueurs => {
                const filtered = joueurs.filter(joueur => joueur.name.length > 0);

                if (filtered.length < 2) {
                    return;
                }

                const divinites = [
                    new Pan,
                    new Athena
                ];

                filtered.forEach((name, i) => {
                    this.game.joueurs.push(
                        new Joueur(name, this.game.couleursJoueur[i], divinites[i])
                    );
                });

                this.game.preparerPions();

                resolve();
            });
        });
    }

    after() {
        this.game.ihm.hide('name');
    }
}