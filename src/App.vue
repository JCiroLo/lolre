<template lang="pug">
Loading(:show="loading")
Navbar
#content
  router-view
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations, mapState } from 'vuex'
import $Actions from './utils/Actions'

import Navbar from './components/Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    ...mapMutations(['setChamps', 'setVersion', 'setLoading', 'setLanguage'])
  },
  async beforeMount () {
    const version = await $Actions.getLatestVersion()
    const champs = await $Actions.getAllData(version)

    this.setChamps(champs)
    this.setVersion(version)

    if (localStorage.lang) {
      this.setLanguage(localStorage.getItem('lang'))
    } else {
      localStorage.setItem('lang', 'en_US')
      this.setLanguage('en_US')
    }

    setTimeout(() => this.setLoading(false), 500)
  }
})
</script>

<style lang="scss" scoped></style>
