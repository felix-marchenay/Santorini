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
    </div>
</template>

<script>
import MainMenu from "./menu/MainMenu";
import SinglePlayerMenu from "./menu/SinglePlayerMenu";
import MultiPlayerMenu from "./menu/MultiplayerMenu";

export default {
    components: { MainMenu, MultiPlayerMenu, SinglePlayerMenu },

    data: function() {
        return {
            page: 'main-menu'
        }
    },

    methods: {
        single() {
            this.page = 'singleplayer';
        },
        multi() {
            this.page = 'multiplayer';
        }
    }
}
</script>

<style lang="scss" scoped>

    #app {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>