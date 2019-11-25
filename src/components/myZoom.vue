<template>
  <div class="limitZoom">
    <div
      class="divZoom"
      :style="{transform: `scale(${transform})`}"
      @mousewheel.prevent="onMouseWheel"
      @dblclick="doubleClick"
    >
    {{transform}}
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transform: 1
    };
  },

  methods: {
    setTransform(action, scale) {
        if(action === 'add'){
            var value = this.transform + scale;
            if(value >= 1 && value < 5) this.transform += scale;
        }

        if(action === "set"){
            if(scale < 1) this.transform = 1;
            if(scale > 5) this.transform = 5;
            else this.transform = scale;
        }
    },

    onMouseWheel(ev) {
      console.log(ev.wheelDelta);
      if (ev.wheelDelta == 120) {
        this.setTransform("add", 0.3);
      } else if (ev.wheelDelta == -120) {
        this.setTransform("add", -0.3);
      }
    },

    doubleClick() {
      if (this.transform == 1) {
        this.setTransform("set", 2);
      } else {
        this.setTransform("set", 1);
      }
    }
  }
};
</script>

<style scoped>
.limitZoom {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.divZoom {
  transition: 0.5s;
}
</style>