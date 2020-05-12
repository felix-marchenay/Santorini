<template>
  <div class="joueur" :class="{ current: active }" joueur="1">
    <div class="image">
      <DiviniteCard :divinite="divinite.slug"/>
    </div>
    <div class="infos">
      <div class="color"></div>
      <div class="divinite-name">{{ divinite.name }}</div>
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
import DiviniteCard from "./DiviniteCard";

export default {
  components: { DiviniteCard },
  props: {
    name: { type: String },
    divinite: { type: Object },
    active: { type: Boolean },
  },
  computed: {
    imgSrc() {
      return "/image/divinite/" + this.divinite.slug + ".jpg";
    },
  },
};
</script>

<style lang="scss" scoped>
.joueur {
  margin: 0 15px;

  &.current {
    .divinite-card {
      transform: rotateZ(-4deg) translate3d(10px, 50px, 0px);
    }
  }

  .divinite-card {
    z-index: 3;
    position: relative;
    transform: rotateZ(-14deg) translateY(190px);
    transition: 150ms ease-out;
    cursor: pointer;
    pointer-events: all;
    box-shadow: 1px 1px 4px 5px rgba(0, 0, 0, 0.5);

    &:hover {
      transform: rotateZ(-7deg) translateY(100px);
    }
  }

  .infos {
    background: rgba(255, 255, 255, 0.95);
    border-top: 5px solid rgb(16, 102, 182);
    border-radius: 5px 5px 0 0;
    padding: 5px 10px;
    min-width: 250px;
    z-index: 4;
    position: relative;

    .divinite-name {
      font-size: 16px;
      color: #444;
      font-style: italic;
      font-weight: 200;
    }

    .name {
      font-size: 18px;
      color: #222;
      font-weight: 600;
    }
  }
}
</style>
