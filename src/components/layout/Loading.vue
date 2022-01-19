<template>
  <div class="loading" :class="{ show }">
    <div class="loading-content">
      <span class="line"></span>
      <div class="backward-circle">
        <div class="lines">
          <span v-for="i in 50" :key="i" :class="`line-${i}`" />
        </div>
      </div>
      <div class="forward-circle">
        <p class="font-lol">LOADING</p>
        <div class="progress-bar">
          <span class="charge-bar" :style="{ maxWidth: `${progress}%` }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  opacity: 0;
  visibility: hidden;
  background-color: rgba($colorBackground, 0.75);

  transition: opacity 0.25s ease-out 0.25s, visibility 0s 0.5s;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: "";
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-image: radial-gradient(
      circle,
      transparent,
      rgba($colorBackground, 0.75),
      $colorBackground
    );
  }

  .loading-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .line {
      width: 100vw;
      height: 3px;
      //background-color: $colorFont;
      background-image: linear-gradient(
        90deg,
        $colorBorder,
        $colorFont,
        $colorBorder
      );
      z-index: 10;
    }

    .backward-circle {
      position: absolute;
      width: 30rem;
      height: 30rem;
      z-index: 10;
      border-radius: 50%;
      box-shadow: 0 0 0 3px $colorBorder inset;
      background-color: $colorBackground;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
        border-radius: 50%;
        border: 3px solid $colorFont;
        border-top: none;
        border-bottom: none;
      }

      .lines {
        position: relative;
        top: 50%;

        animation: spin 60s infinite linear;

        span {
          position: absolute;
          width: 28rem;
          height: 2px;
          top: 100%;
          left: 1rem;

          background-color: rgba($colorFont, 0.25);
        }

        @for $i from 1 through 50 {
          .line-#{$i} {
            transform: rotate(calc(#{$i}* 180deg / 50));
          }
        }
      }
    }

    .forward-circle {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25rem;
      height: 25rem;

      border-radius: 50%;
      background-color: $colorBackground;
      z-index: 20;

      p {
        font-weight: bold;
        color: $colorFont;
        font-size: 2rem;
      }

      .progress-bar {
        width: 75%;
        height: 1rem;
        border: 1px solid $colorFont;
        border-radius: 25px;
        background-color: $colorBackground;

        .charge-bar {
          max-width: 0%;
          height: 100%;

          background-image: linear-gradient(
            90deg,
            rgb(0, 90, 130),
            rgb(113, 202, 212)
          );

          transition: all 0.25s ease-out;
        }
      }
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
