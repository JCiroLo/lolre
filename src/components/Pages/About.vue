<template>
  <div class="summary">
    <h1 class="font-lol">{{ translator().about.about_me }}: The creator</h1>
  </div>
</template>

<script>
import { Translator } from "@/utils/Translator";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLanguage"]),
  },
  methods: {
    translator() {
      return Translator(this.getLanguage);
    },
  },
};
</script>

<style lang="scss" scoped>
.summary {
  padding-top: $heightNav;
  h1 {
    text-align: center;
    color: $colorFont;
  }
}
</style>