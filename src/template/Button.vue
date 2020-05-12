<template>
    <button @click="click">
        <slot></slot>
    </button>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('click');
        }
    }
}
</script>

<style lang="scss" scoped>
    button {
        padding: 10px 15px;
        border-radius: 5px;
        background: rgb(17, 101, 197);
        color: white;
        border: 3px solid rgb(17, 101, 197);
        cursor: pointer;
        transition: 150ms ease-out;

        &:hover {
            border: 3px solid rgb(17, 101, 197);
            color: rgba(17, 101, 197, 0.9);
            background: rgba(17, 101, 197, 0.15);
        }

        &.back {
            background: none;
            color: rgb(17, 101, 197);
            text-decoration: underline;
        }
    }
</style>