<template>
    <div class="multiplayer-menu menu">
        <div class="title">
            <Button class="back" @click="back">
                retour
            </Button>
            <H3>SinglePlayer</H3>
        </div>
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