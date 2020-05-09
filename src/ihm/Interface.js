import { Emitter } from "../infrastructure/emitter";
import { DivinitePicker } from "./DivinitePicker";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.divinitePickers = [];

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

        this.atlasActionMode = 'etage';

        this.initElements();
    }

    show(step) {
        document.querySelector('[step='+step+']').style.display = 'flex';
    }

    showActionFor(divinite) {
        this.show('action-joueur');
        document.querySelector('[step="action-joueur"] [joueur="'+divinite+'"]').style.display = 'flex';
    }

    hideAction (divinite) {
        this.hide('action-joueur');
        document.querySelector('[step="action-joueur"] [joueur="'+divinite+'"]').style.display = 'none';
    }

    hide (step) {
        document.querySelector('[step='+step+']').style.display = "none";
    }

    showSkip() {
        this.show('action-joueur');
        this.skipEl.style.display = 'flex';
    }

    hideSkip() {
        this.hide('action-joueur');
        this.skipEl.style.display = 'none';
    }

    initElements() {
        for (let i = 0; i < 2; i ++) {
            const elPlayer = document.querySelectorAll('.players .player')[i];
            const picker = new DivinitePicker(elPlayer);
            this.divinitePickers.push(picker);
            picker.emitter.on('picked', divinite => {
                elPlayer.querySelector('.divinite-name').innerHTML = this.divinites[divinite].name;
                elPlayer.querySelector('.picked.img-divinite').setAttribute('src', this.divinites[divinite].image);
                elPlayer.querySelector('input[name=divinite]').value = divinite;
            });
        }

        document.querySelector('[name=valider]').addEventListener('click', btn => {
            this.emitter.emit(
                'namesPicked', 
                [...document.querySelectorAll('[step=name] .players .player')].map(el => {
                    return {
                        name: el.querySelector('input[name=name]').value,
                        divinite: el.querySelector('input[name=divinite]').value
                    };
                })
            );
        });

        document.querySelector('[step=victory] button.again').addEventListener('click', () => {
            this.emitter.emit('replay');
        });

        this.skipEl = document.querySelector('#skip');
        this.skipEl.querySelector('button').addEventListener('click', () => {
            this.emitter.emit('skip');
        });

        this.atlasBtn = document.querySelector('[step="action-joueur"] [joueur=atlas] button');

        this.displayAtlasBuildMode();

        this.atlasBtn.addEventListener('click', () => {this.switchAtlasMode()});
    }

    showActivePlayer(joueur) {
        const elPlayers = document.querySelectorAll('[step=joueurs] .joueur');
        
        [...elPlayers].forEach(el => el.classList.remove('current'));

        [...elPlayers].find(el => {
            if (el.querySelector('.infos .name').innerHTML == joueur.name) {
                return true;
            }

            return false;
        }).classList.add('current');
    }

    switchAtlasMode() {
        let mode = 'etage';

        if (this.atlasActionMode == 'etage') {
            mode = 'dome'
        }

        this.atlasActionMode = mode;
        this.displayAtlasBuildMode();
        this.emitter.emit('modeSelected', mode);
    }

    displayAtlasBuildMode() {
        this.atlasBtn.classList = [this.atlasActionMode];
        this.atlasBtn.innerHTML = this.atlasActionMode;
    }

    unsplash() {
        document.querySelector('#splash').classList.remove('active');
    }

    initJoueurs(joueurs) {
        this.show('joueurs');
        joueurs.forEach(joueur => {
            const elJoueur = document.querySelector('[step=joueurs] .joueur[joueur="'+(joueur.nb)+'"]');
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
        document.querySelectorAll('[step]').forEach(el => {el.style.display = 'none'});
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
