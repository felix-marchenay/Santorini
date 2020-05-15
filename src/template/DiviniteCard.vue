<template>
    <div class="divinite-card">
        <img :src="src">
        <div class="name">{{ divinite.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        divinite: {
            type: Object,
        }
    },
    computed: {
        src() {
            return '/image/divinite/' + this.divinite.slug + '.jpg';
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

    &:hover {
        .name {
            border-top: 2px solid cornflowerblue;
            border-bottom: 2px solid cornflowerblue;
            background: rgba(255, 255, 255, 0.95);
            color: rgb(10, 36, 124, 0.9);
            bottom: 12px;
        }
    }

    .name {
        transition: 100ms ease-out;
        position: absolute;
        bottom: 6px;
        left: 0;
        right:0;
        color: rgb(10, 36, 124, 0.7);
        border-top: 2px solid cornflowerblue;
        border-bottom: 2px solid cornflowerblue;
        background: rgba(255, 255, 255, 0.6);
        font-weight: 800;
        padding: 6px;
        text-align: center;
    }
}
</style>