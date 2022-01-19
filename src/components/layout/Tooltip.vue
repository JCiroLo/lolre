<template>
  <div class="custom-tooltip">
    <div class="tooltip-header">
      <img :src="thumb" :alt="`${title}_${key_keyboard}`" />
      <div class="title font-text">[{{ key_keyboard }}] {{ title }}</div>
    </div>
    <div class="tooltip-body">
      <div v-html="description" class="description"></div>
    </div>
    <div class="tooltip-footer" v-if="metadata.length > 0">
      <div v-for="(data, metadataIndex) in metadata" :key="metadataIndex" class="spell-description">
        <strong class="spell-description-title">{{ data.title }}</strong>
        <div class="spell-description-values">
          <span class="active">[ </span>
          <span v-for="(value, valuesIndex) in data.values" :key="valuesIndex">
            <span :class="{ active: valuesIndex === 0 }">{{ value }}</span>
            <span v-if="valuesIndex < data.values.length - 1"> / </span>
          </span>
          <span class="active"> ]</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['key_keyboard', 'thumb', 'title', 'description', 'metadata']
}
</script>

<style lang="scss" scoped>
.custom-tooltip {
  position: absolute;
  bottom: 150%;
  left: 50%;
  min-width: 50vw;
  padding: 1rem;

  opacity: 0;
  visibility: hidden;
  border: 2px solid $colorBorder;
  background-color: $colorBackgroundBlue;

  transform: translateX(-50%);
  transition: opacity 0.25s ease-out, visibility 0.25s ease-out;

  .tooltip-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid $colorBorder;

    img {
      margin-right: 1rem;
    }

    .title {
      color: $colorFont;
      font-size: 1.25rem;
      padding-bottom: 0.25rem;
    }
  }

  .tooltip-body {
    .description {
      padding: 0.25rem 0;
      border-left: none;
      border-right: none;
    }
  }

  .tooltip-footer {
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 2px solid $colorBorder;

    .spell-description {
      display: flex;
      justify-content: space-between;

      .spell-description-title {
        color: $colorFontActive;
      }

      .spell-description-values {
        color: rgba($colorFont, 0.5);

        .active {
          color: $colorFontActive;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
