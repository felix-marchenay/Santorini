<template>
    <div class="multiplayer menu">
        <h3>Multiplayer</h3>
        <Button class="back" @click="back">
            retour
        </Button>
        <input type="room" v-model="roomName" palceholder="Nom de la partie">
        <Button @click="search">Rechercher</Button>
        <PlayerPicker />
    </div>
</template>

<script>
import Button from '../Button';
import PlayerPicker from '../PlayerPicker';

export default {
    components: {
        Button, PlayerPicker
    },
    data: function() {
        return {
            roomName: null
        };
    },
    methods: {
        search() {
            this.$store.emitter.emit('oups', 45);
            this.$store.commit('roomName', this.roomName);
        },
        back() {
            this.$emit('back');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>