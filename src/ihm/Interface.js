import Vue from 'vue';
import App from '../template/App';
import { Emitter } from "../infrastructure/Emitter";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.atlasBuildMode = 'etage';
        
        this.vue = new Vue({
            render: h => h(App),
        }).$mount('#gui');

        this.vue.$on('roomSearch', roomName => {
            this.emitter.emit('roomSearch', roomName);
        });
        this.vue.$on('refreshPlayer', data => {
            console.log('rereshiiing', data);
            this.emitter.emit('refreshPlayer', data);
        });
        this.vue.$on('skip', () => {
            this.emitter.emit('skip');
        });
        this.vue.$on('switchAtlasMode', () => {
            this.atlasBuildMode = (this.atlasBuildMode == 'etage' ? 'dome': 'etage');
            this.emitter.emit('switchAtlasMode', this.atlasBuildMode);
        });
        this.vue.$on('goSingleplayer', data => {
            this.emitter.emit('goSingleplayer', data);
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

    showSkip() {
        this.vue.$emit("showSkip");
    }

    hideSkip() {
        this.vue.$emit("hideSkip");
    }

    showActivePlayer(joueur) {
        this.vue.$emit('activePlayer', joueur);
    }
    tour(action) {
        this.vue.$emit('tour', action);
    }

    victory(joueur) {
        this.vue.$emit('victory', joueur);
    }

    error(error) {
        
    }
}
