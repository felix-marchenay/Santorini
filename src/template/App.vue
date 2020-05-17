<template>
    <div id="app">
        <MainMenu 
            @goto="goto"
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
        <Rules 
            v-show="page == 'rules'" 
            @back="page = 'main-menu'" 
        />
        <div class="fps"></div>
    </div>
</template>

<script>
import MainMenu from "./menu/MainMenu";
import SinglePlayerMenu from "./menu/SinglePlayerMenu";
import MultiPlayerMenu from "./menu/MultiplayerMenu";
import Rules from "./menu/Rules";
import GamePage from "./GamePage";

export default {
    components: { MainMenu, MultiPlayerMenu, SinglePlayerMenu, GamePage, Rules },

    data: function() {
        return {
            page: 'main-menu',
            players: []
        }
    },

    methods: {
        goto (menu) {
            this.page = menu;
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

        .fps {
            position: absolute;
            top: 0;
            left: 0;
            background: black;
            color: white;
            padding: 3px;
        }

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