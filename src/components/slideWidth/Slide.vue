<template>
  <div class="divImg">
    <div style="padding-right: 5px;padding-left: 5px;">
      <img :src="slide.urls.regular" class="img selector" draggable="false"/>
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
  }
};
</script>
    
<style scoped>
.img {
  max-width: 100%;
  padding-right: 5px;
  padding-left: 5px;
}

.divImg {
  width: 100%;
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