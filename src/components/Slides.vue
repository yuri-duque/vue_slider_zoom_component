<template>
  <div ref="slides" class="slides">
    <div
      class="slides-inner selector"
      :style="{width: `${innerWidth}px`, marginLeft: `-${slidesInnerMarginLeft + marginDrag}px`}"
      @mousedown="dragStart($event)"
      @mousemove="arrastador($event)"
      @mouseleave="dragEnd()"
      @mouseup="dragEnd()"
    >
      <div class="slide" :key="index" v-for="(item, index) in images">
        <Slide :style="{width: singleWidth + 'px'}" :slide="item" />
      </div>
    </div>

    <Navigation :images="images" :limitIndex="limitIndex" @changeIndex="changeIndex($event)" />
    {{position}}
    <br />
    {{currentIndex}}
  </div>
</template>

<script>
import Slide from "./Slide.vue";
import Navigation from "./Navigation.vue";

export default {
  components: {
    Slide,
    Navigation
  },

  props: {
    images: {
      type: Array,
      required: true
    },

    itensPerSlide: {
      type: null,
      default: 1
    }
  },

  data() {
    return {
      innerWidth: 0,
      singleWidth: 0,
      currentIndex: 0,

      limitIndex: 0,
      position: 0,

      marginDrag: 0
    };
  },

  computed: {
    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth;
    }
  },

  mounted() {
    this.singleWidth = this.$refs.slides.clientWidth / this.itensPerSlide;
    this.innerWidth = this.singleWidth * this.images.length;

    this.setLimitIndex();
  },

  watch: {
    images() {
      this.setLimitIndex();
    }
  },

  methods: {
    changeIndex(actions) {
      if (actions.action === "proximo") {
        if (this.currentIndex < this.limitIndex) {
          this.currentIndex++;
        }
      } else if (actions.action === "anterior") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      } else if (actions.action === "setIndex") {
        var soma = this.currentIndex + actions.index;

        if(soma > this.limitIndex){
            this.currentIndex = this.limitIndex;
        }
        else if(soma < 0){
            this.currentIndex = 0;
        }else{
            this.currentIndex = soma;
        }
      }
    },

    setLimitIndex() {
      this.limitIndex = this.images.length - this.itensPerSlide;
    },

    arrastador(e) {
      if (this.position) {
        var dif = this.position - e.pageX;
        this.marginDrag = dif;
      }
    },

    dragStart(e) {
      this.position = e.pageX;
    },

    dragEnd() {
      if (this.position) {
        this.position = 0;

        var margin = this.marginDrag < 0 ? -this.marginDrag : this.marginDrag;
        var index = parseInt(margin / this.singleWidth);
        
        //pega a porcentagem de quanto a outra imagem foi vista
        if ((margin % this.singleWidth) / (this.singleWidth / 100) > 50) {
          index++;
        }

        if (this.marginDrag < 0) {
          index = -index;
        }

        this.changeIndex({ action: "setIndex", index });

        this.marginDrag = 0;
      }
    }
  }
};
</script>

<style scoped>
.slides {
  overflow: hidden;
  background-color: black;
}

.slide {
  display: inline-block;
}

.slides-inner {
  display: flex;
  transition: 0.3s
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