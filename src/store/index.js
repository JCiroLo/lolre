import { createStore } from 'vuex'

export default createStore({
  state: {
    champs: [],
    version: '',
    language: 'en_US',
    loading: true,
    hideNavbar: false
  },
  mutations: {
    setChamps (state, payload) {
      state.champs = payload
    },
    setVersion (state, payload) {
      state.version = payload
    },
    setLanguage (state, payload) {
      state.language = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setHideNavbar (state, payload) {
      state.hideNavbar = payload
    }
  },
  getters: {
    filteredChamps: state => name => {
      return state.champs.filter(champ =>
        champ
          .toLowerCase()
          .replaceAll(' ', '')
          .includes(name.trim().toLowerCase())
      )
    },
    getVersion: state => {
      return state.version
    },
    getLanguage: state => {
      return state.language
    },
    getHideNavbar: state => {
      return state.hideNavbar
    }
  },
  actions: {},
  modules: {}
})
