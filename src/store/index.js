import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import cart from './modules/cart'
import history from './modules/history'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart,
    history
  }
})
export default store
