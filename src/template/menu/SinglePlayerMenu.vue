<template>
    <div class="multiplayer-menu">
        <H3>SinglePlayer</H3>
        <Button class="back" @click="back">
            retour
        </Button>
    </div>
</template>

<script>
import Button from '../Button';

export default {
    components: {
        Button    
    },
    methods: {
        back() {
            this.$emit('back');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>