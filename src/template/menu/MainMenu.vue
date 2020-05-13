<template>
    <div class="main-menu menu">
        <Button @click="single">Single player</Button>
        <Button @click="multi">Multiplayer</Button>
    </div>
</template>

<script>
import Button from "../Button";

export default {
    components: {
        Button
    },
    methods: {
        single() {
            this.$emit('single');
        },
        multi() {
            this.$emit('multi');
        }
    }
}
</script>

<style lang="scss" scoped>
.main-menu {
    button {
        margin: 20px;
        font-size: 25px;
        min-width: 250px;
    }
}
</style>