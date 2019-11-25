<template>
  <div ref="div" class="divImg">
    <div style="padding-right: 5px;padding-left: 5px;" class="divImg">
      <img ref="img" :src="slide.urls.regular" class="img selector" draggable="false"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slide: Object
  },

  data() {
    return {};
  },

  mounted(){
    var img = this.$refs.img;
    var div = this.$refs.div;

    if (img) {
      img.addEventListener("load", () => {
        var width = div.offsetWidth;

        this.$emit('setWidth', width);
      });
    }
  }
};
</script>
    
<style scoped>
.img {
  max-height: 100%;
  padding-right: 5px;
  padding-left: 5px;
}

.divImg {
  height: 100%;
}

.selector {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>