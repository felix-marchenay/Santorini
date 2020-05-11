<template>
  <div class="multiplayer menu">
    <h3>Multiplayer</h3>
    <Button class="back" @click="back">retour</Button>
    <div v-if="!room" class="room-search">
      <input type="room" v-model="roomNameInput" palceholder="Nom de la partie" />
      <Button @click="search">Rejoindre</Button>
    </div>
    <div v-else class="players">
      <h2>Room : {{ room }}</h2>
      <div class="my-player">
        <DiviniteCard :divinite="divinite" />
        <input type="text" v-model="playerName" placeholder="Nom" />
        <Button @click="ready">Ready</Button>
      </div>
      <div class="others">
        <div v-for="(player, k) in othersPlayers" :key="k">
          <DiviniteCard :divinite="player.divinite" />
          <p>{{ player.name }}</p>
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
    DiviniteCard
  },
  data: function() {
    return {
      roomNameInput: null,
      room: null,
      serverId: null,
      playerName: "Félix",
      divinite: "no",
      othersPlayers: []
    };
  },
  created() {
    this.$root.$on("enteredRoom", data => {
      console.log('entered !', data);
      this.room = data.room.name;
      this.serverId = data.you;
      this.othersPlayers.push(...data.room.joueurs.filter(j => j.id !== this.serverId));
    });

    this.$root.$on("newPlayer", player => {
      console.log('newplayer : ', player);
      let newPlayer = this.othersPlayers.find(p => p.id == player.id);
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
      this.$root.$emit("ready", {
        name: this.playerName,
        divinite: this.divinite
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>