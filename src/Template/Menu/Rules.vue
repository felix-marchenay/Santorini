<template>
    <div class="menu rules">
        <div class="title">
            <Button class="back" @click="back">retour</Button>
            <h3>Règles</h3>
        </div>
        <iframe src="/image/rules.pdf" frameborder="0"></iframe>
    </div>
</template>

<script>
import Button from '../Button';

export default {
    components: { Button },
    methods: {
        back() {
          this.$emit("back");
        },
    }
}
</script>

<style lang="scss" scoped>

.menu.rules {
    height: 100%;

    iframe {
        width: 100%;
        height: 100%;
    }
}

</style>