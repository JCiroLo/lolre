<template>
  <div class="scroll-progress-bar" :class="{ show }">
    <div
      class="scroll-progress"
      :style="{ maxWidth: `${progress * 100}%` }"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    progress: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.scroll-progress-bar {
  position: fixed;
  top: $heightNav;
  left: 0;
  width: 100%;
  height: 5px;
  opacity: 0;
  background-color: rgba($colorBackground, 0.5);
  z-index: 10;

  transition: all 0.25s ease-out;

  &.show {
    opacity: 1;
  }

  .scroll-progress {
    height: 100%;
    background-color: $colorFont;

    transition: all 0.1s ease-out;
  }
}
</style>