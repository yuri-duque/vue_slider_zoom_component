<template>
  <div id="app">
    <Slides :images="images" :itensPerSlide="6" />
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
      images: []
    };
  },

  async created() {
    this.images = await this.getImages("cars");
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
