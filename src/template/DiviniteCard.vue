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
            return '/image/divinite/' + this.divinite + '.jpg';
        }
    }
}
</script>

<style lang="scss" scoped>
.divinite-card {
    border: 5px solid rgba(110, 110, 110, 0.3);
    box-shadow: 2px 3px 9px 4px rgba(0, 0, 0, 0.7);
    display: inline-block;
    border-radius: 5px;
    position: relative;
    height: 220px;
    width: 160px;
    overflow: hidden;
    transition: 100ms ease-out;

    img {
        width: 100%;
    }
}
</style>