<template>
    <div id="app">
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            page: 'main-menu',
            players: []
        }
    },
}
</script>

<style lang="scss">

    #app {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-family: sans-serif;
        pointer-events: none;

        .fps {
            position: absolute;
            top: 0;
            left: 0;
            background: black;
            color: white;
            padding: 3px;
        }

        .menu {
            pointer-events: all;
            display:flex;
            flex-direction: column;
            align-items: center;

            .title {
                display: flex;
                flex-direction: row;
                
                button.back {
                    border: none;
                    margin: auto;
                }
            }
        }

        .page {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }

</style>