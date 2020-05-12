<template>
    <div class="game page">
        <div class="joueurs">
            <PlayerResume v-for="(player, i) in players" v-bind:key="i" 
                :name="player.name"
                :divinite="player.divinite"
                :active="activePlayerId == player.id"
            />
            <div class="tour" v-if="activePlayer">
                à <span class="player">{{ activePlayer.name }}</span> de <span class="action">{{ action }}</span>
            </div>
        </div>
        .
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
            activePlayerId: null,
            action: null
        };
    },
    computed: {
        activePlayer() {
            return this.players.find(p => p.id == this.activePlayerId);
        }
    },
    created() {
        this.$root.$on('activePlayer', id => {
            this.activePlayerId = id;
        });

        this.$root.$on('tour', action => {
            this.action = action;
        });
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

    .tour {
        position: fixed;
        right: 0;
        bottom: 10px;
        background: rgba(255, 255, 255, 0.89);
        border: 1px solid white;
        padding: 5px 8px;

        span.player {
            font-weight: 800;
            color: brown;
        }
        span.action {
            font-weight: 800;
            color: seagreen;
        }
    }
}
</style>