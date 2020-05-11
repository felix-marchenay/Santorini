<template>
  <div class="joueur" joueur="1">
    <div class="image">
      <img class="img-divinite" :src="imgSrc" alt />
    </div>
    <div class="infos">
      <div class="color"></div>
      <div class="divinite-name">{{ name }}</div>
      <div class="name">{{ diviniteFormatted }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String },
    divinite: { type: String }
  },
  computed: {
    diviniteFormatted() {
      return this.divinite[0].toUpperCase() + this.divinite.substring(1);
    },
    imgSrc() {
      return "/image/divinite/" + this.divinite + ".jpg";
    }
  }
};
</script>

<style lang="scss" scoped>
.joueur {
  margin: 0 15px;

  &.current {
    .img-divinite {
      transform: rotateZ(-4deg) translate3d(10px, 50px, 0px);
    }
  }

  .img-divinite {
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