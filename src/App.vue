<template>
  <div id="app">
    <input type="text" v-model="pesquisa" style="margin-bottom: 15px;"/>
    <button @click="getImages(pesquisa)">Pesquisar</button>
    <Slides :images="images" :itensPerSlide="4" />
  </div>
</template>

<script>
import unsplash from "./api/unsplash";

import Slides from "./components/Slides.vue";

export default {
  name: "app",
  components: {
    Slides
  },

  data() {
    return {
      images: [],
      pesquisa: "cars",
    };
  },

  async created() {
    this.images = await this.getImages(this.pesquisa);
  },

  methods: {
    getImages: async term => {
      const response = await unsplash.get("search/photos", {
        params: { query: term }
      });

      const images = response.data.results;
      return images;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
