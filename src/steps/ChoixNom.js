import { Step } from "./Step";
import { Joueur } from "../joueur";

export class ChoixNoms extends Step
{
    run () {
        return super.run(resolve => {
            this.game.ihm.show('name');
            this.game.ihm.emitter.on('namesPicked', names => {
                const filtered = names.filter(name => name.length > 0);

                if (filtered.length < 2) {
                    return;
                }

                filtered.forEach((name, i) => {
                    this.game.joueurs.push(
                        new Joueur(name, this.game.couleursJoueur[i])
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