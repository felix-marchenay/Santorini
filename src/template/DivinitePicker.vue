<template>
    <div class="divinite-picker" :class="{'active': active}">
        <div class="divinites">
            <DiviniteCard 
                v-for="divinite in divinites" v-bind:key="divinite" 
                :divinite="divinite"
                @click.native="select(divinite)"
            />
        </div>
    </div>
</template>

<script>
import DiviniteCard from './DiviniteCard';

export default {
    components: { DiviniteCard },
    props: {
        active : {
            type: Boolean
        },
    },
    data() {
        return {
            diviniteSelected: null,
            divinites: ['atlas', 'poseidon', 'pan', 'demeter', 'athena', 'no']
        };
    },
    methods: {
        select(divinite) {
            this.$emit('selected', divinite)
        }
    }
}
</script>

<style lang="scss" scoped>

    .divinite-picker {
        position: absolute;
        left: -60px;
        z-index: 3;
        background: rgba(255, 255, 255, 0.85);
        padding: 10px;
        border-radius: 3px;
        box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
        transition: 100ms ease-out;
        transform: scale3d(0.8, 1.1, 1.1);
        pointer-events: none;
        opacity: 0;

        &.active {
            opacity: 1;
            transform: scale3d(1, 1, 1);
            pointer-events: all;
        }
        
        .divinites {
            display: flex;
            flex-wrap: wrap;
            width: 760px;

            .divinite-card {
                margin: 10px;
                cursor: pointer;
                transition: 200ms ease-out;

                &:hover {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
        }
    }

</style>