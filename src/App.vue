<template>
  <Loading :show="loading" :progress="loadingProgress" />
  <Navbar />
  <div id="content">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import { getAllData, getLatestVersion } from "@/utils/Actions";
import Loading from "./components/layout/Loading.vue";

import Navbar from "./components/layout/Navbar.vue";

export default defineComponent({
  components: {
    Navbar,
    Loading,
  },
  data() {
    return { loadingProgress: 0 };
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapMutations(["setChamps", "setVersion", "setLoading", "setLanguage"]),
  },
  async beforeMount() {
    const { data } = await getAllData();
    const version = await getLatestVersion();
    const champs = [];
    for (const key in data) {
      champs.push(key);
    }
    this.setChamps(champs);
    this.setVersion(version);

    this.loadingProgress = 50;

    if (localStorage.lang) {
      this.setLanguage(localStorage.getItem("lang"));
    } else {
      localStorage.setItem("lang", "en_US");
      this.setLanguage("en_US");
    }

    this.loadingProgress = 100;

    setTimeout(() => this.setLoading(false), 500);
  },
});
</script>

<style lang="scss" scoped>
</style>
