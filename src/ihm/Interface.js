import { Emitter } from "../infrastructure/emitter";
import { DivinitePicker } from "./DivinitePicker";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.divinitePickers = [];

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

        this.divinites = {
            athena: {
                name: 'Athéna',
                image: 'image/divinite/athena.jpg'
            },
            demeter: {
                name: 'Demeter',
                image: 'image/divinite/demeter.jpg'
            },
            atlas: {
                name: 'Atlas',
                image: 'image/divinite/atlas.jpg'
            },
            no: {
                name: 'Aucune',
                image: 'image/divinite/no.jpg'
            },
            pan: {
                name: 'Pan',
                image: 'image/divinite/pan.jpg'
            },
            poseidon: {
                name: 'Poséidon',
                image: 'image/divinite/poseidon.jpg'
            }
        };

        this.initElements();
    }

    show(step) {
        document.querySelector('[step='+step+']').style.display = 'flex';
    }

    hide (step) {
        document.querySelector('[step='+step+']').style.display = "none";
    }

    initElements() {
        for (let i = 0; i < 2; i ++) {
            // const elPlayer = document.querySelector('[step=name] .players .player');
            // if (i > 0) {
            //     document.querySelector('[step=name] .players').append(elPlayer.cloneNode(true));
            // }
            const elPlayer = document.querySelectorAll('.players .player')[i];
            const picker = new DivinitePicker(elPlayer);
            this.divinitePickers.push(picker);
            picker.emitter.on('picked', divinite => {
                elPlayer.querySelector('.divinite-name').innerHTML = this.divinites[divinite].name;
                elPlayer.querySelector('.picked.img-divinite').setAttribute('src', this.divinites[divinite].image);
            });
        }
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
