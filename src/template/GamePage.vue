<template>
    <div class="game page">
        <div class="joueurs">
            <PlayerResume v-for="(player, i) in players" v-bind:key="i" 
                :name="player.name"
                :divinite="player.divinite"
            />
        </div>
    </div>
</template>

<script>
import PlayerResume from './PlayerResume';

export default {
    components: { PlayerResume },
    props: {
        players: {
            type: Array,
        }
    },
    data() {
        return {
            
        };
    }
}
</script>

<style lang="scss" scoped>
.game.page {
    display: flex;

    .joueurs {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
}
</style>