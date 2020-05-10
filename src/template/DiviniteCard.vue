<template>
    <div class="divinite-card">
        <img :src="src">
    </div>
</template>

<script>
export default {
    props: {
        divinite: {
            type: String,
        }
    },
    computed: {
        src() {
            return '/public/image/divinite/' + this.divinite + '.jpg';
        }
    }
}
</script>

<style scoped>

</style>