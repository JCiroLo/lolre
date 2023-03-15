import { createStore } from 'vuex'

export default createStore({
  state: {
    champs: null,
    version: '',
    language: 'en_US',
    loading: true,
    hideNavbar: false,
    champName: ''
  },
  getters: {
    getSuggestions: state => champName => {
      return champName
        ? Object.values(state.champs).filter(champ =>
            champ.name.toLowerCase().includes(champName.trim().toLowerCase())
          )
        : state.champs
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
    },
    setSearchChamp (state, payload) {
      state.champName = payload
    }
  },
  actions: {},
  modules: {}
})
