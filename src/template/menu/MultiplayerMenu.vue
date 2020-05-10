<template>
    <div class="multiplayer menu">
        <h3>Multiplayer</h3>
        <Button class="back" @click="back">
            retour
        </Button>
        <div v-if="!room" class="room-search">
            <input type="room" v-model="roomName" palceholder="Nom de la partie">
            <Button @click="search">Rechercher</Button>
        </div>
        <div v-else class="players">
            <PlayerPicker />
        </div>
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
            roomName: null,
            room: this.$store.state.room
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