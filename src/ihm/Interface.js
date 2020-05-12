import Vue from 'vue';
import App from '../template/App';
import { Emitter } from "../infrastructure/Emitter";
import { DivinitePicker } from "./DivinitePicker";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.divinitePickers = [];
        this.atlasBuildMode = 'etage';
        
        this.vue = new Vue({
            render: h => h(App),
        }).$mount('#gui');

        this.vue.$on('roomSearch', roomName => {
            this.emitter.emit('roomSearch', roomName);
        });
        this.vue.$on('ready', data => {
            this.emitter.emit('ready', data);
        });
        this.vue.$on('skip', () => {
            this.emitter.emit('skip');
        });
        this.vue.$on('switchAtlasMode', () => {
            this.atlasBuildMode = (this.atlasBuildMode == 'etage' ? 'dome': 'etage');
            this.emitter.emit('switchAtlasMode', this.atlasBuildMode);
        });
    }

    enteredRoom(room) {
        this.vue.$emit('enteredRoom', room);
    }

    newPlayer(player) {
        this.vue.$emit('newPlayer', player);
    }

    letsGo(joueurs) {
        this.vue.$emit('letsgo', joueurs);
    }

    removePlayer(player) {
        this.vue.$emit('removePlayer', player);
    }

    switchAtlasMode(player) {
        this.vue.$emit('switchAtlasMode', player);
    }

    // show(step) {
    //     document.querySelector('[step='+step+']').style.display = 'flex';
    // }

    // showActionFor(divinite) {
    //     this.show('action-joueur');
    //     document.querySelector('[step="action-joueur"] [joueur="'+divinite+'"]').style.display = 'flex';
    // }

    // hideAction (divinite) {
    //     this.hide('action-joueur');
    //     document.querySelector('[step="action-joueur"] [joueur="'+divinite+'"]').style.display = 'none';
    // }

    // hide (step) {
    //     document.querySelector('[step='+step+']').style.display = "none";
    // }

    showSkip() {
        this.vue.$emit("showSkip");
    }

    hideSkip() {
        this.vue.$emit("hideSkip");
    }

    // initElements() {
    //     for (let i = 0; i < 2; i ++) {
    //         const elPlayer = document.querySelectorAll('.players .player')[i];
    //         const picker = new DivinitePicker(elPlayer);
    //         this.divinitePickers.push(picker);
    //         picker.emitter.on('picked', divinite => {
    //             elPlayer.querySelector('.divinite-name').innerHTML = this.divinites[divinite].name;
    //             elPlayer.querySelector('.picked.img-divinite').setAttribute('src', this.divinites[divinite].image);
    //             elPlayer.querySelector('input[name=divinite]').value = divinite;
    //         });
    //     }

    //     document.querySelector('[name=valider]').addEventListener('click', btn => {
    //         this.emitter.emit(
    //             'namesPicked', 
    //             [...document.querySelectorAll('[step=name] .players .player')].map(el => {
    //                 return {
    //                     name: el.querySelector('input[name=name]').value,
    //                     divinite: el.querySelector('input[name=divinite]').value
    //                 };
    //             })
    //         );
    //     });

    //     document.querySelector('[step=victory] button.again').addEventListener('click', () => {
    //         this.emitter.emit('replay');
    //     });

    //     this.skipEl = document.querySelector('#skip');
    //     this.skipEl.querySelector('button').addEventListener('click', () => {
    //         this.emitter.emit('skip');
    //     });

    //     this.atlasBtn = document.querySelector('[step="action-joueur"] [joueur=atlas] button');

    //     this.displayAtlasBuildMode();

    //     this.atlasBtn.addEventListener('click', () => {this.switchAtlasMode()});
    // }

    showActivePlayer(joueur) {
        this.vue.$emit('activePlayer', joueur);
    }

    // switchAtlasMode() {
    //     let mode = 'etage';

    //     if (this.atlasActionMode == 'etage') {
    //         mode = 'dome'
    //     }

    //     this.atlasActionMode = mode;
    //     this.displayAtlasBuildMode();
    //     this.emitter.emit('modeSelected', mode);
    // }

    // displayAtlasBuildMode() {
    //     this.atlasBtn.classList = [this.atlasActionMode];
    //     this.atlasBtn.innerHTML = this.atlasActionMode;
    // }

    // unsplash() {
    //     document.querySelector('#splash').classList.remove('active');
    // }

    // initJoueurs(joueurs) {
    //     this.show('joueurs');
    //     joueurs.forEach(joueur => {
    //         const elJoueur = document.querySelector('[step=joueurs] .joueur[joueur="'+(joueur.nb)+'"]');
    //         elJoueur.querySelector('.img-divinite').setAttribute('src', 'image/divinite/' + joueur.divinite.name.toLowerCase() + '.jpg');
    //         elJoueur.querySelector('.infos .divinite-name').innerHTML = joueur.divinite.name;
    //         elJoueur.querySelector('.infos .name').innerHTML = joueur.name;
    //         elJoueur.querySelector('.color').style.backgroundColor = '#'+joueur.couleurHex;
    //     });
    // }

    // info(str) {
    //     this.show('info');
    //     document.querySelector('[step=info]').innerHTML = str;
    // }

    tour(action) {
        this.vue.$emit('tour', action);
    }

    // hideAll() {
    //     document.querySelectorAll('[step]').forEach(el => {el.style.display = 'none'});
    // }

    victory(victoire) {
        this.vue.$emit('victory', joueur);
    }

    error(error) {
    //     document.querySelector('.errors').innerHTML = error;
    //     setTimeout(() => {
    //         document.querySelector('.errors').innerHTML = '';
    //     }, 2500);
    }
}
