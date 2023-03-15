/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from './components/Loading/index.vue'

import './assets/scss/App.scss'

createApp(App)
  .use(store)
  .use(router)
  .component('Loading', Loading)
  .mount('#app')
