<template>
    <div class="player-picker">
        <DiviniteCard divinite="atlas"/>
        <input type="text" v-model="name" placeholder="Nom">
    </div>
</template>

<script>
import DiviniteCard from './DiviniteCard';

export default {
    components: {
        DiviniteCard
    },
    data: function() {
        return {
            name: ''
        };
    },
    
}
</script>

<style lang="scss">



</style>