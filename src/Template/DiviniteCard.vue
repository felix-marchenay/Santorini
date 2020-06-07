<template>
    <div class="divinite-card" @click="click" :class="{clicked : clicked, onClick: showDescriptionOnClick}">
        <img :src="src">
        <div class="description" :class="{ onHover: showDescriptionOnHover }" v-if="showDescription">{{ divinite.description }}</div>
        <div class="name">{{ divinite.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        divinite: {
            type: Object,
        },
        showDescriptionOnHover: {
            type: Boolean
        },
        showDescriptionOnClick: {
            type: Boolean
        }
    },
    data() {
        return {
            clicked : false
        };
    },
    computed: {
        src() {
            return '/image/divinite/' + this.divinite.slug + '.jpg';
        },
        showDescription() {
            return this.showDescriptionOnHover || this.showDescriptionOnClick;
        }
    },
    methods: {
        click() {
            this.clicked = !this.clicked;
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

    &.onClick {
        
        &.clicked {
            transform: none;

            .description {
                opacity: 1;
            }

            &:hover {
                transform: translate(0);
            }
        }
    }

    .description {
        transition: 150ms ease-out;
        position: absolute;
        padding: 3px 4px;
        top: 0;
        left: 0;
        right: 0;
        font-size: 16px;
        opacity: 0;
        background: rgba(255, 255, 255, 0.9);
    }

    &:hover {
        .description.onHover {
            opacity: 1;
        }
        .name {
            border-top: 2px solid cornflowerblue;
            border-bottom: 2px solid cornflowerblue;
            background: rgba(255, 255, 255, 0.95);
            color: rgba(10, 36, 124, 0.9);
            bottom: 0px;
        }
    }

    .name {
        transition: 100ms ease-out;
        position: absolute;
        bottom: 6px;
        left: 0;
        right:0;
        color: rgba(10, 36, 124, 0.7);
        border-top: 2px solid cornflowerblue;
        border-bottom: 2px solid cornflowerblue;
        background: rgba(255, 255, 255, 0.6);
        font-weight: 800;
        padding: 6px;
        text-align: center;
    }
}
</style>