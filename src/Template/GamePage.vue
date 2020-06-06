<template>
    <div class="game page">
        <div class="joueurs">
            <PlayerResume v-for="(player, i) in players" v-bind:key="i" 
                :player="player"
                :active="activePlayerId == player.id"
            />
            <div class="actions">
                <div class="skip" v-if="showSkip">
                    <Button @click="skip">Passer</Button>
                </div>
                <div class="atlas" v-if="atlasBuilding">
                    <Button @click="switchAtlasMode" :class="atlasMode">{{ atlasMode }}</Button>
                </div>
            </div>
            <div class="tour" v-if="activePlayer">
                à <span class="player">{{ activePlayer.name }}</span> de <span class="action">{{ action }}</span>
            </div>
            <div class="victory" v-if="playerVictorious">
                <div class="text">
                    Victoire pour <span class="name">{{ playerVictorious.name }}</span> !!
                </div>
                <div class="buttons">
                    <Button @click="replay">Rejouer</Button>
                    <Button @click="backToMainMenu">Menu principal</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerResume from './PlayerResume';
import Button from './Button';

export default {
    components: { PlayerResume, Button },
    props: {
        players: {
            type: Array,
        }
    },
    data() {
        return {
            activePlayerId: null,
            action: null,
            atlasMode: 'etage',
            showSkip: false,
            playerVictoriousId: null
        };
    },
    computed: {
        activePlayer() {
            return this.players.find(p => p.id == this.activePlayerId);
        },
        atlasBuilding() {
            return this.activePlayer && this.activePlayer.divinite.slug == 'atlas' && this.action.search(/construire/) != -1;
        },
        playerVictorious() {
            if (this.playerVictoriousId === null) {
                return null;
            }

            return this.players.find(p => p.id == this.playerVictoriousId);
        }
    },
    created() {
        this.$root.$on('joueurActif', joueur => {
            this.activePlayerId = joueur.id;
        });

        this.$root.$on('tour', action => {
            this.action = action;
        });

        this.$root.$on('showSkip', () => {
            this.showSkip = true;
        });

        this.$root.$on('hideSkip', () => {
            this.showSkip = false;
        });

        this.$root.$on('victory', joueur => {
            this.playerVictoriousId = joueur.id;
        });

        this.$root.$on('hideVictory', () => {
            this.playerVictoriousId = null;
        });

        this.$root.$on('setAtlasMode', mode => {
            this.atlasMode = mode;
        });
    },
    methods: {
        skip() {
            this.$root.$emit('skip');
        },
        switchAtlasMode() {
            this.atlasMode = this.atlasMode == 'etage' ? 'dome' : 'etage';
            this.$root.$emit('switchAtlasMode', this.atlasMode);
        },
        replay() {
            this.playerVictoriousId = null;
            this.$emit('replay');
        },
        backToMainMenu() {
            this.playerVictoriousId = null;
            this.$emit('main-menu');
        }
    }
}
</script>

<style lang="scss">
.game.page {
    display: flex;

    .joueurs {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .actions {
        position: absolute;
        right: 20px;
        bottom: 60px;
        padding: 15px;
        pointer-events: all;

        button {
            font-size: 28px;
            border: 3px solid #fff;
            box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.6);
        }

        .atlas {
            button {
                text-transform: uppercase;
                outline: none;

                &.dome {
                    border-radius: 40px 40px 2px 2px;
                    background: rgb(16, 102, 182);
                    color: white;
                    border: 3px solid rgba(16, 102, 182, 0.4);
                }
    
                &.etage {
                    border-radius : 4px 4px 2px 2px;
                }
            }
        }
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

    .victory {
        pointer-events: all;
        position: fixed;
        left: 50%;
        bottom: 130px;
        background: white;
        z-index: 5;
        transform: translate(-50%, 0);
        padding: 20px;
        font-size: 22px;
        border-radius: 5px;
        border: 5px solid rgb(16, 102, 182);

        span.name {
            font-weight: 800;
            color: rgb(9, 56, 78);
        }

        .buttons {
            display: flex;
            flex-direction: column;
            margin-top: 10px;

            button {
                margin: 6px 0;
                font-size: 21px;
            }
        }
    }
}
</style>