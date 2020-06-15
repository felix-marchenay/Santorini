<template>
    <div class="multiplayer-menu menu">
        <div class="title">
            <Button class="back" @click="back">
                retour
            </Button>
            <H3>SinglePlayer</H3>
        </div>

        <div class="players">
            <div v-for="(player, k) in players" v-bind:key="k" class="player">
                <div class="human">
                    <Button @click="player.type = 'humain'" :class="{active: player.type == 'humain'}">Vrai humain</Button>
                    <Button @click="player.type = 'ia'" :class="{active: player.type == 'ia'}">Ordinateur</Button>
                </div>
                <DivinitePicker @selected="setDivinite($event, k)" :active="player.divinitePickerActive" :divinites="divinites"/>
                <DiviniteCard :divinite="player.divinite" @click.native="player.divinitePickerActive = true"/>
                <input type="text" @input="updateName($event.target.value, k)" placeholder="Nom" />
            </div>
        </div>

        <Button @click="letsgo">Go</Button>
    </div>
</template>

<script>
import Button from '../Button';
import DiviniteCard from '../DiviniteCard';
import DivinitePicker from '../DivinitePicker';

export default {
    components: {
        Button,
        DivinitePicker,
        DiviniteCard
    },
    data() {
        return {
            players: [
                {
                    name: 'Joueur 1',
                    divinite: {
                        name: "Sans divinité",
                        slug: "no",
                        description: ""
                    },
                    divinitePickerActive: false,
                    type: 'humain',
                    order: 1
                },
                {
                    name: 'Joueur 2',
                    divinite: {
                        name: "Sans divinité",
                        slug: "no",
                        description: ""
                    },
                    divinitePickerActive: false,
                    type: 'ia',
                    order: 2
                },
            ],
            divinites: [
                {
                    name: "Sans divinite",
                    slug: "no",
                    description: ""
                },
                {
                    name: "Atlas",
                    slug: "atlas",
                    description: "desc"
                },
                {
                    name: "Triton",
                    slug: "triton",
                    description: "desc"
                },
                {
                    name: "Zeus",
                    slug: "zeus",
                    description: "desc"
                },
                {
                    name: "Minotaur",
                    slug: "minotaur",
                    description: "desc"
                }
            ]
        };
    },
    methods: {
        back() {
            this.$emit('back');
        },
        letsgo() {
            this.$emit('go', this.players);
        },
        updateName(name, k) {
            this.players[k].name = name;
        },
        setDivinite(divinite, k) {
            this.players[k].divinite = divinite;
            this.players[k].divinitePickerActive = false;
        }
    }
}
</script>

<style lang="scss">
.players {
    display: flex;
    min-width: 450px;
    justify-content: space-evenly;
    position: relative;

    .human {
        button {
            border: 2px solid rgba(0, 0, 0, 0.6);
            background: none;
            padding: 4px;
            color : black;

            &.active {
                background: rgb(26, 52, 201);
                border: 2px solid rgb(26, 52, 201);
                color: white;
            }
        }
    }

    .player {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;

        input {
            margin: 10px 0;
            padding: 8px 12px;
            border: 1px solid rgba(0, 0, 0, 0.4);
            border-radius: 3px;
            text-align: center;
        }

        .divinite-card {
            transition: 105ms ease-out;

            &:hover {
                cursor: pointer;
                transform: scale3d(1.06, 1.06, 1);
            }
        }
    }
}
</style>