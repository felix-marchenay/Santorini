<template>
    <div class="main-menu menu">
        <Button @click="goto('singleplayer')">Single player</Button>
        <Button @click="goto('multiplayer')">Multiplayer</Button>
        <Button @click="goto('rules')">Règles</Button>
    </div>
</template>

<script>
import Button from "../Button";

export default {
    components: {
        Button
    },
    methods: {
        goto(menu) {
            this.$emit('goto', menu);
        },
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