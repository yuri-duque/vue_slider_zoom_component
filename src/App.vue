<template>
  <div id="app">
    <input type="text" v-model="pesquisa" style="margin-bottom: 15px;"/>
    <button @click="search(pesquisa)">Pesquisar</button>
    <SlidesH :images="images" :itensPerSlide="4"  style="margin-bottom: 30px;"/>
    <Slides :images="images" :itensPerSlide="4"  style="margin-top: 30px;"/>
  </div>
</template>

<script>
import unsplash from "./api/unsplash";

import Slides from "./components/slideWidth/Slides.vue";
import SlidesH from "./components/slideHeight/Slides.vue";

export default {
  name: "app",
  components: {
    Slides,
    SlidesH
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
    async search(term){
      this.images = await this.getImages(term);
    },

    getImages: async term => {
      debugger;
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
