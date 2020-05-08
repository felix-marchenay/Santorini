import { Step } from "./Step";
import { Joueur } from "../joueur";
import { Divinite } from "../divinite/Divinite";
import { Pan } from "../divinite/Pan";
import { Atlas } from "../divinite/Atlas";
import { Athena } from "../divinite/Athena";
import { Demeter } from "../divinite/Demeter";
import { Poseidon } from "../divinite/Poseidon";
import { NoDivinite } from "../divinite/NoDivinite";

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

                const divinites = {
                    pan: new Pan,
                    atlas: new Atlas,
                    demeter: new Demeter,
                    poseidon: new Poseidon,
                    athena: new Athena,
                    no: new NoDivinite,
                };

                filtered.forEach((info, i) => {
                    this.game.joueurs.push(
                        new Joueur(i+1, info.name, this.game.couleursJoueur[i], divinites[info.divinite], this.game.scene)
                    );
                });

                this.game.ihm.initJoueurs(this.game.joueurs);

                resolve();
            });
        });
    }

    after() {
        this.game.ihm.hide('name');
    }
}