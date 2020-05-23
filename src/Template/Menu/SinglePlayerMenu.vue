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
                    <Button @click="player.type = 'human'" :class="{active: player.type == 'human'}">Vrai humain</Button>
                    <Button @click="player.type = 'cpu'" :class="{active: player.type == 'cpu'}">Ordinateur</Button>
                </div>
                <DivinitePicker @selected="setDivinite($event, k)" :active="player.divinitePickerActive"/>
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
// import { NoDivinite } from '../../divinite/NoDivinite';

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
                    name: '',
                    // divinite: new NoDivinite,
                    divinitePickerActive: false,
                    type: 'human'
                },
                {
                    name: '',
                    // divinite: new NoDivinite,
                    divinitePickerActive: false,
                    type: 'cpu'
                },
            ],
        };
    },
    methods: {
        back() {
            this.$emit('back');
        },
        letsgo() {
            this.$root.$emit('goSingleplayer', this.players);
        },
        updateName(name, k) {
            this.players[k].name = name;
        },
        setDivinite(divinite, k) {
            // this.players[k].divinite = divinite;
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