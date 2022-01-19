<template>
  <div class="main-container">
    <h1 class="font-lol">{{ translator().home.search_text }}</h1>
    <div class="form-champ-selector">
      <form v-on:submit.prevent="get" novalidate>
        <div class="outer-path">
          <input
            tabindex="99"
            v-model="champName"
            @input="getFilteredChamps()"
            @keydown="
              e => {
                navigateInput(e, champName)
              }
            "
            type="text"
            class="form-control font-lol"
          />
        </div>
        <button class="btn font-text">
          {{ translator().home.search_button }}
        </button>
      </form>
      <div
        class="font-lol suggestions"
        :class="{ active: champName.length > 0 }"
      >
        <div
          :tabindex="idx + 100"
          v-for="(champ, idx) in arrayChamps"
          :key="idx"
          @click="goToLore(champ)"
          @keydown="
            e => {
              navigateInput(e, champ)
            }
          "
          :id="`nav${idx + 100}`"
        >
          {{ champ }}
        </div>
      </div>
    </div>
    <br />
    <p class="font-text font-weight-bold">
      {{ translator().home.version }} {{ version }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import { Translator } from '@/utils/Translator'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      champName: '',
      arrayChamps: []
    }
  },
  computed: {
    ...mapState(['champs', 'version']),
    ...mapGetters(['filteredChamps', 'getLanguage'])
  },
  methods: {
    async get () {
      const champNameFormated = this.champName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
      this.$router.push(`/${this.getLanguage}/champion/${champNameFormated}`)
    },
    getFilteredChamps () {
      this.arrayChamps = this.filteredChamps(this.champName)
    },
    goToLore (champ) {
      this.$router.push(`/${this.getLanguage}/champion/${champ}`)
    },
    translator () {
      return Translator(this.getLanguage)
    },
    navigateInput (eInner, champ) {
      try {
        const keyValue = eInner.which
        const tabIndex = Number(eInner.target.attributes['tabindex'].nodeValue)

        if (keyValue == 40) {
          const newTabIndex = tabIndex + 1
          document.getElementById(`nav${newTabIndex}`).focus()
        } else if (keyValue == 38) {
          const newTabIndex = tabIndex - 1
          document.getElementById(`nav${newTabIndex}`).focus()
        } else if (keyValue == 13) {
          this.goToLore(champ)
        }
      } catch (e) {}
    }
  },
  beforeCreate () {
    this.$route.params.language === '' && this.$router.push(`/en_US`)
  },
  beforeMount () {
    document.title = 'Lolre'
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: $heightNav * 2;

  background-image: url('https://cdn.wallpapersafari.com/68/91/4T2imR.png');
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-image: radial-gradient(
      circle,
      transparent,
      rgba($colorBackground, 0.55),
      $colorBackground
    );
    pointer-events: none;
  }

  h1 {
    font-weight: 900;
    font-size: 3em;
    margin-bottom: 2rem;
    text-align: center;
    color: $colorFont;
    z-index: 10;
    text-shadow: 0 0 10px $colorBackground;
  }

  p {
    color: rgba(#fff, 0.25);
    z-index: 5;
  }

  .form-champ-selector {
    position: relative;
    z-index: 10;

    &:focus-within .suggestions.active,
    &:hover .suggestions.active {
      max-height: 12rem;
      opacity: 1;

      transition: all 0.1s ease-out;
    }

    form {
      display: flex;
      justify-content: center;
      min-width: 50vw;
      box-shadow: none;

      transition: box-shadow 0.25s ease-out;

      &:focus-within,
      &:hover {
        box-shadow: 0 0 20px rgba($colorFontActive, 0.25);

        button {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 0);
        }
      }

      .outer-path {
        width: 100%;
        padding: 2px;
        clip-path: polygon(
          $pathPosition 0%,
          100% 0,
          100% 100%,
          0 100%,
          0 $pathPosition
        );
        background-color: $colorFont;

        transition: clip-path 0.1s ease-out;

        &:focus-within,
        &:hover {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0% 0);
        }

        input {
          padding-left: 1.25em;
          padding-right: 1.25em;
          clip-path: polygon(
            $pathPosition 0%,
            100% 0,
            100% 100%,
            0 100%,
            0 $pathPosition
          );
          font-weight: bold;
          letter-spacing: 2px;
          color: $colorFontActive;
          background-color: $colorBackground;

          transition: clip-path 0.1s ease-out;

          &:focus,
          &:hover {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0% 0);
          }
        }
      }

      button {
        padding-left: 0.5rem;
        clip-path: polygon(
          0 0,
          100% 0,
          100% calc(100% - #{$pathPosition}),
          calc(100% - #{$pathPosition}) 100%,
          0 100%,
          0 $pathPosition
        );
        border-radius: 0;
        background-color: $colorFont;

        transition: clip-path 0.2s;

        &:hover {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 0);
        }
      }
    }

    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 0;
      opacity: 0;

      overflow-y: auto;
      background-color: $colorBackground;
      color: $colorFont;
      border: 2px solid $colorFont;

      transition: all 0.1s ease-out;

      div {
        height: 2.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: bold;

        transition: all 0.25s ease-out;

        &:hover,
        &:focus {
          background-color: $colorFont;
          color: $colorBackground;
          outline: none;
        }

        &:active {
          background-color: $colorFontActive;
        }
      }
    }
  }
}
</style>
