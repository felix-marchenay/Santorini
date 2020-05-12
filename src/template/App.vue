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
            page: 'main-menu',
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
        this.page = 'singleplayer';

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

        .img-divinite {
            border: 5px solid rgba(110, 110, 110, 0.3);
            box-shadow: 2px 3px 9px 4px rgba(0, 0, 0, 0.7);
            display: inline-block;
            border-radius: 5px;
            position: relative;
            transition: 100ms ease-out;
        }
    }

</style>