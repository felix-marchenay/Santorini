<template>
    <div class="main-menu">
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

</style>