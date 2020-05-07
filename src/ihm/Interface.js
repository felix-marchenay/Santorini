import { Emitter } from "../infrastructure/emitter";
import { DivinitePicker } from "./DivinitePicker";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.divinitePicker = new DivinitePicker;

        document.querySelector('[name=valider]').addEventListener('click', btn => {
            this.emitter.emit(
                'namesPicked', 
                [...document.querySelectorAll('[step=name] input.name')].map(el => {
                    return {
                        name: el.value
                    };
                })
            );
        });
    }

    show(step) {
        document.querySelector('[step='+step+']').style.display = 'flex';
    }

    hide (step) {
        document.querySelector('[step='+step+']').style.display = "none";
    }

    initJoueurs(joueurs) {
        this.show('joueurs');
        joueurs.forEach((joueur, n) => {
            const elJoueur = document.querySelector('[step=joueurs] .joueur[joueur="'+(n+1)+'"]');
            elJoueur.querySelector('.img-divinite').setAttribute('src', 'image/divinite/' + joueur.divinite.name.toLowerCase() + '.jpg');
            elJoueur.querySelector('.infos .divinite-name').innerHTML = joueur.divinite.name;
            elJoueur.querySelector('.infos .name').innerHTML = joueur.name;
        });
    }

    info(str) {
        this.show('info');
        document.querySelector('[step=info]').innerHTML = str;
    }

    tour(joueur, action) {
        this.show('tour');
        document.querySelector('[step=tour] .name').innerHTML = joueur.name;
        document.querySelector('[step=tour] .action').innerHTML = action;
    }

    hideAll() {
        document.querySelector('[step]').style.display = 'none';
    }

    victory(victoire) {
        this.hideAll();
        this.show('victory');
        document.querySelector('[step=victory] .name').innerHTML = victoire.joueur.name;
    }

    error(error) {
        document.querySelector('.errors').innerHTML = error;
        setTimeout(() => {
            document.querySelector('.errors').innerHTML = '';
        }, 2500);
    }
}
