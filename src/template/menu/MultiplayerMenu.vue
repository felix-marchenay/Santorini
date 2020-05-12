<template>
<div class="multiplayer menu">
    <div class="title">
        <Button class="back" @click="back">retour</Button>
        <h3>Multiplayer</h3>
    </div>
    <div v-if="!room" class="room-search">
        <input
        type="room"
        v-model="roomNameInput"
        placeholder="Nom de la partie"
        />
        <Button @click="search">Rejoindre</Button>
    </div>
    <div v-else>
        <h2>Room : {{ room }}</h2>
        <div class="players">
            <div class="my player">
                <DiviniteCard :divinite="divinite" />
                <input type="text" v-model="playerName" placeholder="Nom" />
                <Button :class="{active: amReady}" @click="ready">{{ amReady ? 'Ready!': 'not ready' }}</Button>
            </div>
            <div v-for="(player, k) in othersPlayers" :key="k" class="other player">
                <DiviniteCard :divinite="player.divinite" />
                <p>{{ player.name }}</p>
                <div :class="{active: player.ready}" class="ready">{{ player.ready ? 'Ready!': 'not ready' }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Button from "../Button";
import PlayerPicker from "../PlayerPicker";
import DiviniteCard from "../DiviniteCard";

export default {
  components: {
    Button,
    PlayerPicker,
    DiviniteCard,
  },
  data: function() {
    return {
      roomNameInput: null,
      room: null,
      serverId: null,
      playerName: "Félix",
      divinite: "no",
      amReady: false,
      othersPlayers: [],
    };
  },
  created() {
    this.$root.$on("enteredRoom", (data) => {
      console.log("entered !", data);
      this.room = data.room.name;
      this.serverId = data.you;
      this.othersPlayers.push(
        ...data.room.joueurs.filter((j) => j.id !== this.serverId)
      );
    });
    
    this.$root.$on("newPlayer", (player) => {
        let newPlayer = this.othersPlayers.find((p) => p.id == player.id);
        if (newPlayer != null) {
            newPlayer.name = player.name;
            newPlayer.divinite = player.divinite;
            newPlayer.ready = player.ready;
        } else {
            this.othersPlayers.push(player);
        }
    });
  },
  methods: {
    search() {
      this.$root.$emit("roomSearch", this.roomNameInput);
    },
    back() {
      this.$emit("back");
    },
    ready() {
        this.amReady = !this.amReady;
        this.$root.$emit("ready", {
            name: this.playerName,
            divinite: this.divinite,
            ready: this.amReady
        });
    },
  },
};
</script>

<style lang="scss" scoped>
    h2 {
        text-align: center;
    }
    .players {

        display: flex;
        min-width: 450px;
        justify-content: space-evenly;

        .player {
            display: flex;
            align-items: center;
            flex-direction: column;

            &.my {

                input {
                    margin: 10px 0;
                    padding: 8px 12px;
                    border: 1px solid rgba(0, 0, 0, 0.4);
                    border-radius: 3px;
                    text-align: center;
                }

                button {
                    background: none;
                    color: grey;

                    &.active {
                        background: #1165c5;
                        color: white;
                    }
                }
            }

            &.other {
                p {
                    text-align: center;
                }
                .ready {
                    display: inline-block;
                    border: 2px solid rgba(0, 0, 0, 0.4);
                    transition: 300ms ease-out;
                    padding: 10px;
                    border-radius: 4px;
                    color: rgb(150, 150, 150);

                    &.active {
                        background: rgba(7, 109, 21, 0.9);
                        color: white;
                    }
                }
            }
        }
    }
</style>
