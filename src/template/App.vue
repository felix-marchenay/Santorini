<template>
    <div id="app">
        <MainMenu 
            @single="single" 
            @multi="multi"
            v-show="page == 'main-menu'"
        />
        <SinglePlayerMenu 
            v-show="page == 'singleplayer'"
            @back="page = 'main-menu'"
        />
        <MultiPlayerMenu 
            v-show="page == 'multiplayer'"
            @back="page = 'main-menu'"
        />
        <GamePage
            v-show="page == 'game'"
            :players="players"
        />
    </div>
</template>

<script>
import MainMenu from "./menu/MainMenu";
import SinglePlayerMenu from "./menu/SinglePlayerMenu";
import MultiPlayerMenu from "./menu/MultiplayerMenu";
import GamePage from "./GamePage";

export default {
    components: { MainMenu, MultiPlayerMenu, SinglePlayerMenu, GamePage },

    data: function() {
        return {
            page: 'singleplayer',
            players: []
        }
    },

    methods: {
        single() {
            this.page = 'singleplayer';
        },
        multi() {
            this.page = 'multiplayer';
        }
    },
    
    created() {
        this.$root.$on('letsgo', joueurs => {
            this.page = 'game';
            this.players = joueurs;
        });
    }
}
</script>

<style lang="scss">

    #app {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-family: sans-serif;
        pointer-events: none;

        .menu {
            pointer-events: all;
            display:flex;
            flex-direction: column;
            align-items: center;

            .title {
                display: flex;
                flex-direction: row;
                
                button.back {
                    border: none;
                    margin: auto;
                }
            }
        }

        .page {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }

</style>