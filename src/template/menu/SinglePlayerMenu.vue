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
                    divinite: 'no',
                    divinitePickerActive: false
                },
                {
                    name: '',
                    divinite: 'no',
                    divinitePickerActive: false
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
    }
}
</style>