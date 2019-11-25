<template>
  <div ref="slides" class="slides">
    <Zoom @zoomOff="zoomOff = $event">
      <div
        ref="slides-inner"
        class="slides-inner selector"
        :class="{'transition' : position == 0}"
        :style="{height: `500px`, marginLeft: `-${slidesInnerMarginLeft + marginDrag}px`}"
      >
        <div class="slide" :key="index" v-for="(item, index) in images">
          <Slide style="height: 500px" :slide="item" @setWidth="item.width = $event" />
          Width: {{item.width}}
        </div>
      </div>
    </Zoom>

    <Navigation
      :images="images"
      :limitIndex="limitIndex"
      @changeIndex="changeIndex($event)"
      style="margin-top: 35px;"
    />
    {{position}}
    <br />
    {{currentIndex}}
  </div>
</template>

<script>
import Slide from "./Slide.vue";
import Navigation from "../Navigation.vue";
import Zoom from "../zoom.vue";

export default {
  components: {
    Slide,
    Navigation,
    Zoom
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

      marginDrag: 0,

      zoomOff: true,
    };
  },

  computed: {
    slidesInnerMarginLeft() {
      var width = 0;

      for (let index = 0; index < this.currentIndex; index++) {
        const element = this.images[index];
        width += element.width;
      }

      return width;
    }
  },

  mounted() {
    this.setSize();
    this.setLimitIndex();

    window.addEventListener("resize", this.setSize);
    if ("ontouchstart" in window) {
      this.$el.addEventListener("touchstart", this.dragStart);
      this.$el.addEventListener("touchmove", this.arrastador);
      this.$el.addEventListener("touchend", this.dragEnd);
      this.$el.addEventListener("touchleave", this.dragEnd);
    } else {
      this.$el.addEventListener("mousedown", this.dragStart);
      this.$el.addEventListener("mousemove", this.arrastador);
      this.$el.addEventListener("mouseleave", this.dragEnd);
      this.$el.addEventListener("mouseup", this.dragEnd);
    }
  },

  watch: {
    images() {
      this.setLimitIndex();
    }
  },

  methods: {
    setSize() {
      this.singleWidth = this.$refs.slides.clientWidth / this.itensPerSlide;
      this.innerWidth = this.singleWidth * this.images.length;
    },

    changeIndex(actions) {
      const actionsChange = {
        Proximo: () => {
          if (this.currentIndex < this.limitIndex) this.currentIndex++;
        },
        Anterior: () => {
          if (this.currentIndex > 0) this.currentIndex--;
        },
        Paginacao: () => {
          this.currentIndex = actions.index;
        },
        SetIndex: () => {
          var soma = this.currentIndex + actions.index;

          if (soma > this.limitIndex) {
            this.currentIndex = this.limitIndex;
          } else if (soma < 0) {
            this.currentIndex = 0;
          } else {
            this.currentIndex = soma;
          }
        }
      };

      const funcao = actionsChange[actions.action];

      if (funcao) {
        funcao();
      }
    },

    setLimitIndex() {
      this.limitIndex = this.images.length - 2;
    },

    arrastador(e) {
      if (this.position) {
        var dif = this.position - this.getPosition(e);
        this.marginDrag = dif;
      }
    },

    dragStart(e) {
      if(this.zoomOff){
        this.position = this.getPosition(e);
      }
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

        this.changeIndex({ action: "SetIndex", index });

        this.marginDrag = 0;
      }
    },

    getPosition(e) {
      if ("ontouchstart" in window) {
        return e.touches[0].clientX;
      } else {
        return e.pageX;
      }
    }
  }
};
</script>

<style scoped>
.slides {
  overflow: hidden;
}

.slide {
  display: inline-block;
}

.slides-inner {
  display: flex;
}

.transition {
  transition: 0.5s;
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