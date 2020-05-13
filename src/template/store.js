import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        joueurs: [],
        room: null
    },
    mutations: {
        roomName (state, name) {
            state.roomName = name;
            this.
        }
    }
});