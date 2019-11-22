<template>
  <div class="navegacao">
    <button @click="goToAnterior()">Anterior</button>
    <div :key="index" v-for="(item, index) in images" class="paginacao">
      <button v-if="buttonValide(index)" @click="setIndex(index)">{{index + 1}}</button>
    </div>
    <button @click="goToProximo()">Proximo</button>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },

    limitIndex: {
      type: null,
      default: 0
    }
  },

  methods: {
    goToProximo() {
      this.$emit("changeIndex", { action: "Proximo" });
    },

    goToAnterior() {
      this.$emit("changeIndex", { action: "Anterior" });
    },

    setIndex(index) {
      this.$emit("changeIndex", { action: "Paginacao", index: index });
    },

    buttonValide(index) {
      if (index <= this.limitIndex) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.paginacao {
  display: inline-block;
}
</style>